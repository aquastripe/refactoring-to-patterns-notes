# Replace Conditional Logic with Strategy

以 Strategy 取代條件邏輯（Conditional Logic）。

為每個變體（variant）建立一個 Strategy 物件，然後將函式委派（delegate）給 Strategy 的實體。

![](../assets/fig/7.2.1.jpg)

## 動機

::: tip 優點
- 透過減少或移除條件邏輯的方式簡化
- 把演算法變異移給一個繼承體系，用來簡化類別
- 讓演算法可以在執行期轉換為另一個演算法

:::

::: warning 缺點
- 當「以繼承為基礎的解法」或來自 Simplifying Conditional Expression [F] 的解法更簡單時，會讓設計變得更複雜
- 會讓演算法從其 context class 中取資料的方式變得更複雜

:::

## 作法

找出 context：帶有一個包含許多條件邏輯的計算方法（calculation method）。
1. 建立一個 Strategy<br >
    以計算方法的行為為這個 Strategy 命名。

2. 使用 *Move Method* [F] 將計算方法移到 Strategy。<br >
    先在 context 上為這個計算方法保留一個簡易版本，context 會把實際工作委派給 Strategy。<br >
    為了實現這個委派，必須定義並具現一個 delegate 成為一個 context 的欄位，其 reference 指向 Strategy。
    如果 Strategy 需要存取資料，以下有兩個常見作法：
    - 把 context 當作參數傳給 Strategy 的建構式或計算方法。<br >
        這麼做需要把 context 設定為 public。請考慮只給 context 的資料提供最少的公開權限。
        - 優點：為 context 新增新的 public 函式時，不用更動很多程式碼，就可以被所有 concrete Strategies 使用。
        - 缺點：破壞資訊隱藏，本來只能給 context 看到的資料會讓其他類別看到。
    - 透過計算方法的參數，將需要的傳進 Strategy。
      - 優點：context 和 Strategy 之間形成最低耦合。
      - 缺點：資料會被傳進 **每個** concrete Strategy，不論它們是否需要這些資料。

    這些方法所面臨的挑戰，與所需要的資料量有關。如果參數太多，最好就把整個 context 以 reference 傳給 Strategy。也可以用 *Introduce Parameter Object* [F] 減少參數量。如果某些參數只為了某個特定的 concrete Strategy 需要，可以從參數列移除，改成透過建構式傳入。

    Context 中可能會有些輔助函式應該在 Strategy 上面，可以實作任何必要的 accessors，讓它將輔助函式從 context 移到 Strategy。

3. 讓客戶碼裝配 context，使它帶有 Strategy 實體。<br >
    作法是對 context 程式碼中「具現一個 concrete Strategy 並作為委派對象」的部份實施 *Extract Parameter* [F]。

4. 在 Strategy 計算方法上面使用 *Replace Conditional with Polymorphism* [F]。<br >
   為了這麼做，你必須使用 *Replace Type Code with Subclasses* [F] 或是 *Replace Type Code with State/Strategy* [F]，請選擇前者。如果計算方法上的條件邏輯辨識出特定計算型別，請使用條件邏輯代替顯式型別（explicit types）。

   一次只集中焦點建立一個 subclass。如果可以的話，請將 Strategy 變成 abstract class。

## 範例

找出 context: 在 `Loan` 類別中，有一個 `capital()` 的計算方法。

``` java
public class Loan {
    // ...
    public double capital() { 
        if (expiry == null && maturity != null) 
            return commitment * duration() * riskFactor(); 
        if (expiry != null && maturity == null) { 
            if (getUnusedPercentage() != 1.0) 
                return commitment * getUnusedPercentage() * duration() * riskFactor();         
            else 
                return (outstandingRiskAmount() * duration() * riskFactor()) + (unusedRiskAmount() * duration() * unusedRiskFactor()); 
        } 
        return 0.0; 
    }
}
```

內含以下幾個輔助函式：

``` java
public class Loan {
    // ...
    private double outstandingRiskAmount() { 
        return outstanding; 
    } 
    private double unusedRiskAmount() { 
        return (commitment - outstanding); 
    }
    public double duration() { 
        if (expiry == null && maturity != null) 
            return weightedAverageDuration(); 
        else if (expiry != null && maturity == null) 
            return yearsTo(expiry); 
        return 0.0; 
    }
    private double weightedAverageDuration() { 
        double duration = 0.0; 
        double weightedAverage = 0.0;
        double sumOfPayments = 0.0;
        Iterator loanPayments = payments.iterator(); 
        while (loanPayments.hasNext()) { 
            Payment payment = (Payment)loanPayments.next(); 
            sumOfPayments += payment.amount(); 
            weightedAverage += yearsTo(payment.date()) * payment.amount();
        } 
        if (commitment != 0.0) 
            duration = weightedAverage / sumOfPayments;
         return duration; 
    }
    private double yearsTo(Date endDate) {
        Date beginDate = (today == null ? start : today); 
        return ((endDate.getTime() - beginDate.getTime()) / MILLIS_PER_DAY) /  DAYS_PER_YEAR;
    }
    private double riskFactor() { 
        return RiskFactor.getFactors().forRating(riskRating);
    }
    private double unusedRiskFactor() { 
        return UnusedRiskFactors.getFactors().forRating( riskRating); 
    }
}
```

1. 建立一個 `CapitalStrategy` 類別
    ``` java
    public class CapitalStrategy { 

    }
    ```
2. 用 *Move Method* [F] 把 `capital()` 計算工作移到 `CapitalStrategy`。這個步驟需要在 `Loan` 上留下一個簡單版的 `capital()`，用來把工作委派給一個 `CapitalStrategy` 的實體。

    首先宣告一個 `capital()`:
    ``` java
    public class CapitalStrategy {    
        public double capital() {   
            return 0.0; 
        } 
    }
    ```

    然後從 `Loan` 複製程式碼到 `CapitalStrategy`:
    ``` java
    public class CapitalStrategy {
        public double capital() { // copied from Loan 
            if (expiry == null && maturity != null) 
                return commitment * duration() * riskFactor();
            if (expiry != null && maturity == null) { 
                if (getUnusedPercentage() != 1.0) 
                    return commitment * getUnusedPercentage() * duration() * riskFactor(); 
                else
                    return (outstandingRiskAmount() * duration() * riskFactor()) + (unusedRiskAmount() * duration() * unusedRiskFactor());
                } 
            return 0.0;
        } 
        private double riskFactor() { // moved from Loan 
            return RiskFactor.getFactors().forRating(riskRating); 
        } 
        private double unusedRiskFactor() { // moved from Loan 
            return UnusedRiskFactors.getFactors().forRating(riskRating); 
        }
    }
    ```

    這時候發現，不能把 `duration()` 移到 `CapitalStrategy`，因為 `weightedAverageDuration` 也需要知道 `Loan` 的付款資訊。
3. 