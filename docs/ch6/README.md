# 創建

本章的重構手法涵蓋與建立物件相關的問題：

- 建構式（constructor）的寫法
- 過度複雜的建構邏輯（construction logic）
- 非必要的 *Singleton* [DP]


## 創建函式（Creation Method）

建立並返回物件實體的 static 或 non-static 函式。

和 *Factory Method* [DP] 不一樣，*Factory Method* 不可以是 static，且必須被兩個 class 實作 -- 通常一個是 superclass 另一個是 subclass。


## Factory

Factory 都會實作一個或多個 Creation Methods。如果建立物件的資料和程式碼蔓延在多個 classes，就會產生 *解法蔓生*（Solution Sprawl）的壞味道。需要使用 *Move Creation Knowledge to Factory* 把創建碼和資料集中在一個 *Factory* [F]。

*Encapsulate Classes with Factory* 最常見的兩個動機是：
- 確保客戶經由共同介面對 classes 的實體進行溝通
- 讓 classes 的實體可以經由 *Factory* 被存取，降低客戶窺見 classes 細節的機會


## Builder

*Builder* [DP] 是簡化物件結構的建構式最好的作法。

*Encapsulate Composite with Builder* 示範如何以更簡單、不容易出錯的方式建立 *Composite* [DP]。


## Singleton

因為經常遇到太多沒用的 *Singleton* [DP]，本章最後一項重構 *Inline Singleton* 用來教你如何移除 *Singleton*。
