# 工具

這章列出本書的高階重構中會使用到的低階轉換。


## Chain Constructors

讓建構式互相呼叫，用來移除建構式中的重複碼，在 [Replace Constructors with Creation Methods](../ch6/replace-constructors-with-creation-methods.md) 使用到。


## Unify Interfaces

當你需要讓 superclass 和/或 interface 也擁有和 subclass 一樣的介面時，這項重構會有用，在 [Move Embellishment to Decorator](../ch7/move-embellishment-to-decorator.md) 和 [Move Accumulation to Visitor](../ch10/move-accumulation-to-visitor.md) 使用到。


## Extract Parameter

當欄位被賦予一個「區域內具現值」（locally instantiated value），但寧願用參數提供這個數值時，這項重構會有用。雖然他在很多情況有用，但 [Move Embellishment to Decorator](../ch7/move-embellishment-to-decorator.md) 只有在實施 Replace Inheritance with Delegation [F] 之後才會用到這項重構。
