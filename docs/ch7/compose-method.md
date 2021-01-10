# Compose Method

將邏輯操作轉化為幾個目的清楚且細節層級相同的步驟。

``` java
public void add(Object element) {
    if (!readOnly) {
        int newSize = size + 1;

        if (newSize > elements.length) {
            Object[] newElements = new Object[elements.length + 10];
         
            for (int i = 0; i < size; i++)
                newElements[i] = elements[i];

            elements = newElements;
        }
        elements[size++] = element;
    }
}
```

重構成

``` java
public void add(Object element) {
    if (readOnly)
        return;

    if (atCapacity())
        grow();

    addElement(element);
}
```

## 動機

所謂 Composed Method 是一個可以讓你立刻理解的簡單小函式。
如果程式碼有很多 Composed Methods，就比較容易理解、閱讀和擴充。

Composed Method 由函式組成，良好的 Composed Method 包含相同的細節層級。以下程式碼 2--12 與 14--16 屬於不同的細節層級：

``` java
private void paintCard(Graphics g) {
    Image image = null; 
    if (card.getType().equals("Problem")) { 
        image = explanations.getGameUI().problem; 
    } 
    else if (card.getType().equals("Solution")) { 
        image = explanations.getGameUI().solution; 
    } 
    else if (card.getType().equals("Value")) { 
        image = explanations.getGameUI().value; 
    } 
    g.drawImage(image,0,0,explanations.getGameUI()); 
    
    if (shouldHighlight()) 
        paintCardHighlight(g); 
    paintCardText(g); 
}
```

透過 refactor to Composed Method 可以讓 `paintCard()` 內呼叫的每一個函式都屬於相同的細節層級：

``` java
private void paintCard(Graphics g) {     
    paintCardImage(g); 

    if (shouldHighlight())
        paintCardHighlight(g);
    paintCardText(g); 
}
```

refactor to Composed Method 會使用多次 *Extract Method* [F]，直到那個 Composed Method 經由呼叫其他函式完成大部份工作為止。

最難的部份是 **決定所抽取的函式要/不要放進哪些程式碼**。

如果抽取太多程式碼放入一個函式中，會不知道函式該取什麼名字，請使用 *Inline Method* [F] 將程式碼移回去。

完成重構以後，可能會擁有很多小型的 private 函式。

有些人可能會覺得有效能問題。只有在 profiler 這麼說的時候，他們才真的有效能問題。大部份嚴重的效能問題都跟 Composed Method 無關。

如果一個 class 內多個函式都做過這個重構，會發現裡面有太多 private 函式，可以找機會使用 *Extract Class*。

這個重構另一個缺點跟除錯有關。如果對 Composed Method 除錯，可能不容易找出真正的工作點，因為邏輯散佈在許多小型函式內。(?)

::: tip 優點
- 有效表達函式所做的事情以及函式如何做這件事。
- 把函式分成多個「名稱明確」且「細節層級相同」的行為來簡化。

:::

::: warning 缺點
- 產生過多小型函式。
- 讓除錯變難，因為工作邏輯散佈在許多小函式內。

:::

## 作法

沒有簡單可重複的步驟，但是有個準則：
- 小：Composed Method 的程式碼很少超過 10 行，通常大約 5 行。
- 移除重複和無用的（dead code）程式碼。
- 表達目的：讓你的變數、函式和參數取一個清楚的名稱來傳達它的目的。
- 簡化：轉換程式碼，讓它變得簡單。為了這樣做，需要探究如何為某件事情寫 code，並實驗各種替代方案。
- 使用相同的細節層級（same level of detail）。如果摻雜了不同細節層級，請將低階的程式碼下移（push down）到名稱明確的函式內。

## 範例

``` java
public class List...
    public void add(Object element) { 
        if (!readOnly) { 
        int newSize = size + 1; 
        if (newSize > elements.length) { 
            Object[] newElements = new Object[elements.length + 10]; 
            for (int i = 0; i < size; i++)     
                newElements[i] = elements[i]; 
                elements = newElements; 
        }
        elements[size++] = element; 
    } 
}
```

把條件句用來當作防衛子句（guard clause），就可以在函式裡面做一個早期出口（early exit）。

``` java
public class List... 
    public void add(Object element) { 
        if (readOnly)
            return; 

        int newSize = size + 1; 
        if (newSize > elements.length) { 
            Object[] newElements = new Object[elements.length + 10]; 
            for (int i = 0; i < size; i++) 
                newElements[i] = elements[i];
        
            elements = newElements; 
        }
        elements[size++] = element; 
    }
```

把 10 用 *Extract Variable* 抽出來變成 `GROWTH_INCREMENT`：

``` java
public class List... 
    private final static int GROWTH_INCREMENT = 10; 
    
    public void add(Object element)... 
        ... 
        Object[] newElements = new Object[elements.length + GROWTH_INCREMENT ];
        ...
```

把 `newSize > elements.length` 抽出來變成 `atCapacity()`：

``` java
public class List... 
    public void add(Object element) { 
        if (readOnly) 
            return; 
            
        if (atCapacity()) { 
            Object[] newElements = new Object[elements.length + GROWTH_INCREMENT]; 
            for (int i = 0; i < size; i++) 
                newElements[i] = elements[i]; 
            elements = newElements; 
        } 
        elements[size++] = element; 
    } 
    private boolean atCapacity() { 
        return (size + 1) > elements.length; 
    }
```

抽出 `grow()`：

``` java
public class List... 
    public void add(Object element) { 
        if (readOnly) 
            return; 
        
        if (atCapacity()) 
            grow(); 
        
        elements[size++] = element; 
    } 

    private void grow() { 
        Object[] newElements = new Object[elements.length + GROWTH_INCREMENT]; 
        for (int i = 0; i < size; i++) 
            newElements[i] = elements[i]; 
    
        elements = newElements; 
    }
```

抽出 `addElement()`：

``` java
public class List... 
    public void add(Object element) { 
        if (readOnly) 
            return; 
        
        if (atCapacity()) 
            grow(); 
            
        addElement(element); 
    }
    
    private void addElement(Object element) { 
        elements[size++] = element; 
    }
```
