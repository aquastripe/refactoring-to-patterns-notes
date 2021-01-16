# 設計模式

[[TOC]]

## 什麼是設計模式（patterns）

Alexander:
> 每個 pattern 都是個「三部份組成的規則」（three-part rule）：描述情境（context）、問題（problem）和解決方案（solution）之間的關係。
> 
> 就像世界上的元素一樣，每個 pattern 都是一種「由三樣事物構成」的關係，這三樣事物分別是：某種情境（context）、該情境下重複發生的作用力系統（system of force），以及讓作用力互相消除的空間結構（spatial configuration）。
> 
> 就像語言的元素一樣，在適當的環境下 pattern 是一種指引，說明空間結構如何可以再三地消除已知的作用力系統。
> 
> 總之，pattern 是世界上曾經發生過的事物，也是告訴我們如何產生這樣事物的規則，並且告訴我們必須在何時產生它。他是過程（process）也是事物（thing）；同時也是現有事物的描述以及產生該事物的過程描述。


## Patterns 帶來的喜樂（Patterns Happy）

可參考[如何使用設計模式來寫 Hello World](https://taskinoor.wordpress.com/2011/09/21/the-abuse-of-design-patterns-in-writing-a-hello-world-program/)


## 條條道路通 Patterns

（略）


## 重構成為（to）、接近（toward）、遠離（away from） 設計模式

作者整理一個表格，整理了本書描述的關於設計模式的重構「成為」、「接近」、「遠離」的方法：
[https://flylib.com/books/en/1.476.1.41/1/](https://flylib.com/books/en/1.476.1.41/1/)


## Patterns 會讓程式碼變得更複雜嗎？

（說故事）簡單來說，菜雞也會欣賞好的設計。通常設計模式的實作應該有助於移除重複碼、簡化邏輯、傳達程式碼的目的以及增進彈性。

不過，人們對設計模式的熟悉度在他們**理解 patterns-based refactorings** 這件事情上扮演了一個重要角色。寧可讓團隊學習設計模式，不要讓團隊因為設計模式太複雜而逃避。如果因為某個設計模式實作可能導致程式碼變得複雜，請馬上回頭，或進行更多重構。


## 模式知識（Pattern Knowledge）

如果你不了解設計模式，你不太可能發展出偉大的設計。

（吹捧 JUnit 和 Kent Beck）

如何取得設計模式的知識？作者偏好選擇優質的設計模式書籍來學習，然後開讀書會一個星期學習一個設計模式。[Pool of Insight](https://www.industriallogic.com/blog/pools-of-insight-study-groups/) 描述如何成立一個能夠長期運作的 patterns 讀書會。


## 以模式進行預設計（Up-Front Design）

（說故事）

結論：通常不贊同以設計模式進行預設計，不過 *Command* 是主要例外，因為它容易實作，而且系統的行為明確需要 *Command* 的支援。
