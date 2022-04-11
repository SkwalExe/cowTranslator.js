# CowTranslator.js 🐄

![](images/1.png)

JavaScript library to translate cow language 🐄 to text

# jsDelivr 

```html
<script src="https://cdn.jsdelivr.net/gh/SkwalExe/cowTranslator.js@main/src/cowTranslator.min.js"></script>
```

# Usage 📝

This library provides 2 functions:
- `cowTranslator.cowToText` : translate cow language to text
- `cowTranslator.textToCow` : translate text to cow language

Each of these functions returns a translationResult class : 

- `translationResult.text` : the human version
- `translationResult.cow` : the cow version
- `translationResult.error` : the error message if any
- `translationResult.success` : whether the translation was successful or not
- `translationResult.warning` : whether warnings were generated or not

## Human to cow

**Translate Hello World ! to cow language**

```js
let cow = cowTranslator.textToCow("Hello world !");
```

`.cow` is the cow version of the text

```js
cow.cow // "mOoOoOO moooOoo mooOoOO mooOoOO mooOOOo mOOOOOo moOoOOo mooOOOo moOoooO mooOoOO mooooOO mOOOOOo MoooooO"
```

The translation is successful

```js
cow.success // true
```

## Cow to human

**Translate `"mOoOoOO moooOoo mooOoOO mooOoOO mooOOOo mOOOOOo"` to human language**

```js
let human = cowTranslator.cowToText("mOoOoOO moooOoo mooOoOO mooOoOO mooOOOo mOOOOOo");
```

`.text` is the human version

```js
human.text // "Hello"
```

## Errors and warnings

If an error occured and the translation was not successful, the following properties are set:

- `translationResult.success` : ⛔ false
- `translationResult.error` : the error message
  
If warnings were generated, the following properties are set:

- `translationResult.warning` : ⚠️ true
- `translationResult.error` : the warning message
- `translationResult.success` : ✅ true


# final

If you have any problem, don't hesitate to open an issue

# contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

<a href="https://github.com/SkwalExe#ukraine"><img src="https://raw.githubusercontent.com/SkwalExe/SkwalExe/main/ukraine.jpg" width="100%" height="15px" /></a>