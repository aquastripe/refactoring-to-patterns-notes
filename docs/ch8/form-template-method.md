# Form Template Method

兩個子類別中的方法用相似的步驟、相同的順序，但步驟不太一樣。

將步驟以同一種簽名（signatures）抽取到方法中來通用化（generalize），再提取（pull up）通用化的方法形成範本方法。


## 動機

範本方法為實作一個演算法的不變的部份一次，再利用子類別來實作可變的行為 [DP]。在實作子類別的方法時，如果會變動的行為與不變的行為混雜在一起，那麼不變的行為會在子類別中重複。重構成範本方法可以幫助消除重複的不變行為。

一個範本方法不變行為包含以下：
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

::: tip 優點
- 

:::

::: warning 缺點
- 

:::


## 作法


## 範例


