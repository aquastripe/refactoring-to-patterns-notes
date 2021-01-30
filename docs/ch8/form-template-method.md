# Form Template Method

兩個子類別中的方法用相似的步驟、相同的順序，但步驟不太一樣。

將步驟以同一種簽名（signatures）抽取到方法中來通用化（generalize），再提取（pull up）通用化的方法形成 Template Method 。


## 動機

Template Method (範本方法) 為實作一個演算法的不變的部份一次，再利用子類別來實作可變的行為 [DP]。在實作子類別的方法時，如果會變動的行為與不變的行為混雜在一起，那麼不變的行為會在子類別中重複。重構成 Template Method 可以幫助消除重複的不變行為。

一個 Template Method 不變行為包含以下：
- 被呼叫的方法以及這些方法的順序
- 子類別必須覆寫的抽象方法
- 子類別可能覆寫的 hook 方法（亦即：concrete methods）

例如：
```java
public abstract class Game... 
public void initialize() { 
    deck = createDeck(); 
    shuffle(deck); 
    drawGameBoard(); 
    dealCardsFrom(deck); 
} 
protected abstract Deck createDeck(); 
protected void shuffle(Deck deck) { 
    /// ...shuffle implementation 
} 
protected abstract void drawGameBoard(); 
protected abstract void dealCardsFrom(Deck deck);
```

在 `initialize()` 內被呼叫的方法的順序是固定不變的，子類別必須覆寫（override）的抽象方法也是不變的。但由 `Game` 提供實作的 `shuffle()` 並非不變：它是一個 hook，可以讓子類別繼承或是去覆寫。

 Template Method 通常會呼叫 Factory Method，像是前面的 `createDect()`。Introduce Polymorphic Creation with Factory Method 提供了一個實際的例子。

有些語言像是 Java 提供 `final` 可以把 Template Method 宣告成常數，避免子類別意外去覆寫。

::: tip 優點
- 藉由移動固定的部份到超類別來移除子類別的重複碼。
- 簡化一個通用演算法的步驟。
- 讓子類別可以更容易來客製化一個演算法。

:::

::: warning 缺點
- 如果子類別必須實作演算法中的很多個方法，那麼這樣做會讓設計變得更複雜。

:::


## 作法

1. 在階層中找到 *相似的方法*：以相似的順序進行相似步驟的方法。在相似的方法上使用 [Compose Method](../ch7/compose-method.md) 來抽出相同的方法（在每個子類別中有相同簽名和內容的方法）和獨特的方法（在每個子類別中有不同簽名和內容的方法）。<br>
    在決定是否抽出相同和獨特的方法時，要考慮：如果抽出獨特方法，最後（5）需要在超類別內產生抽象或具體的版本。是否子類別繼承或是覆寫這個獨特方法有意義？如果沒意義，就抽出來放進相同的方法。
2. 用 *Pull Up Method* [F] 相同的方法到超類別。
3. 為了讓每個版本的相似方法中產生相同的內容，使用 *Rename Method* [F] 在每個獨特方法直到相似的方法在每個超類別都是相同的。
4. 如果相似的方法在超類別中還沒有相同的簽名，使用 *Rename Method* [F] 來產生出相同的簽名。
5. 使用 *Pull Up Method* [F] 在相似的方法（或是超類別內），為超類別內的每個獨特方法定義抽象方法。被 pulled up 的方法即是 Template Method。


## 範例

在 [Replace Conditional Logic with Strategy](../ch7/replace-conditional-logic-with-strategy.md) 的範例最後，抽象類別 `CapitalStrategy` 底下有三個子類別：


這三個子類別正好包含少量的重複部份，可以用 Template Method 移除。比較常見的作法是結合 Strategy 和 Template Method 來產生具體 Strategy 類別，其中只有很少或是沒有重複碼。

`CapitalStrategy` 類別為了資本計算定義了一個抽象方法：

```java
public abstract class CapitalStrategy... 
    public abstract double capital(Loan loan);
```

```java
public class CapitalStrategyAdvisedLine {
    public double capital(Loan loan) { 
        return loan.getCommitment() * loan.getUnusedPercentage() * duration(loan) * riskFactorFor(loan); 
    }
}

public class CapitalStrategyRevolver {
    // ...
    public double capital(Loan loan) { 
        return (loan.outstandingRiskAmount() * duration(loan) * riskFactorFor(loan)) + (loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan)); 
    }
}

public class CapitalStrategyTermLoan {
    // ...
    public double capital(Loan loan) { 
        return loan.getCommitment() * duration(loan) * riskFactorFor(loan); 
    }

    protected double duration(Loan loan) { 
        return weightedAverageDuration(loan); 
    }
    private double weightedAverageDuration(Loan loan) {
        // ...
    }
}
```

我們可以觀察到 `CapitalStrategyAdvisedLine` 對 `CapitalStrategyTermLoan` 來說是相同的，除了一個步驟 `loan.getUnusedPercentage()`。

1. `capital(...)` 方法被 `CapitalStrategyAdvisedLine` 和 `CapitalStrategyTermLoan` 以相似方法實作。<br>
    使用 Compose Method 在 `capital(...)` 的實作部份來抽出相同或獨特方法。<br>
    因為只有 `CapitalStrategyAdvisedLine` 的 `loan.getUnusedPercentage()` 部份不同、其他都相同，我們必須選擇把它抽成獨特方法或是把其他抽成相同方法，兩種方法都行得通。<br>
    根據 Domain Knowledge 可以知道公式：Risk Amount x Duration x Risk Factor<br>
    這引導我們去把 `CapitalStrategyAdvisedLine` `loan.getCommitment() * loan.getUnusedPercentage()` 抽出去變成 `riskAmountFor()`，同時處理 `CapitalStrategyTermLoan` 相似的步驟：
    ```java
    public class CapitalStrategyAdvisedLine {
        public double capital(Loan loan) { 
            return riskAmountFor(loan) * duration(loan) * riskFactorFor(loan); 
        }
        private double riskAmountFor(Loan loan) { 
            return loan.getCommitment() * loan.getUnusedPercentage(); 
        }
    }
    public class CapitalStrategyTermLoan {
        public double capital(Loan loan) { 
            return riskAmountFor(loan) * duration(loan) * riskFactorFor(loan); 
        } 
        private double riskAmountFor(Loan loan) { 
            return loan.getCommitment(); 
        }
    }
    ```
    Domain-Driven Design 描述我們如何根據 domain knowledge 來引導我們選擇如何進行重構。
2. 這一步是將相同的方法 pull up 到超類別。但是這裡我們抽出獨特的部份，因此略過這一步。
3. 確保每個獨特方法 `riskAmountFor` 在子類別都有相同的簽名。
4. 確保相似的方法 `capital` 在子類別都有相同的簽名。
5. 現在 `capital` 在每個子類別都有相同的簽名，因此我們可以使出 Pull Up Method。<br>
    ```java{3-6}
    public abstract class CapitalStrategy {
        // public abstract double capital(Loan loan); 
        public double capital(Loan loan) { 
            return riskAmountFor(loan) * duration(loan) * riskFactorFor(loan); 
        } 
        public abstract double riskAmountFor(Loan loan);
    }
    ```

    ```java
    public abstract class CapitalStrategy {
        public double capital(Loan loan) { 
            return loan.getCommitment() * unusedPercentageFor(loan) * duration(loan) * riskFactorFor(loan); 
        } 
        public abstract double riskAmountFor(Loan loan); 
        protected double unusedPercentageFor(Loan loan) { // hook method 
            return 1.0;
        };
    }
    ```

    ```java
    public class CapitalStrategyAdvisedLine {
        protected double unusedPercentageFor(Loan loan) {
            return loan.getUnusedPercentage(); 
        };
    }
    ```

    ```java{2-4}
    public class CapitalStrategyTermLoan {
        // public double capital(Loan loan) { 
        //     return loan.getCommitment() * duration(loan) * riskFactorFor(loan); 
        // } 
        protected double duration(Loan loan) { 
            return weightedAverageDuration(loan); 
        } 
        private double weightedAverageDuration(Loan loan) {
            // ...
        }
    }
    ```

    ```java
    public class CapitalStrategyRevolver {
        public double capital(Loan loan) { 
            return (loan.outstandingRiskAmount() * duration(loan) * riskFactorFor(loan)) + (loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan)); 
        }
    }
    ```

    ```java{5-7}
    public class CapitalStrategyRevolver {
        public double capital(Loan loan) { 
            return super.capital(loan) + (loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan)); 
        } 
        protected double riskAmountFor(Loan loan) { 
            return loan.outstandingRiskAmount(); 
        }
    }
    ```

    ```java{5-7}
    public class CapitalStrategyRevolver {
        public double capital(Loan loan) { 
            return super.capital(loan) + unusedCapital(loan); 
        } 
        public double unusedCapital(Loan loan) { 
            return loan.unusedRiskAmount() * duration(loan) * unusedRiskFactor(loan); 
        }
    } 
    ```
