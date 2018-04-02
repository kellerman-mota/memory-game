webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = "ul {\n    columns: 3;\n    -webkit-columns: 3;\n    -moz-columns: 3;    \n    list-style-type: none;    \n}\n\ndiv.card{\n    width: 100px;\n    height: 100px;\n    border: 1px solid;    \n}\n\n.center-align{\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;    \n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align:center\">\n  <h1>\n    Memory Game [{{points}} Points]\n  </h1>\n  <h2 [ngStyle]=\"error?{'color': 'red'}:''\">{{message}}</h2>  \n  <button (click)=\"resetGame()\">Reset Game</button>   \n</div>\n<div class=\"center-align\">\n  <ul>\n    <li *ngFor=\"let item of cards; index as i\">\n      <div class=\"card center-align\" (click)=\"turn(item)\" [ngStyle]=\"{'background-color': item.color}\">\n        <h2>{{item.showValue ? item.value : verseCardValue}}</h2>\n      </div>\n      <p></p>\n    </li>\n  </ul>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card_model__ = __webpack_require__("./src/app/card.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.verseCardValue = "::";
        this.cardValuesTemplate = ["A", "B", "C", "D", "E", "F"];
        this.cards = [];
        this.cardsSelected = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        this.resetGame();
    };
    AppComponent.prototype.turn = function (card) {
        if (card.disabled)
            return;
        this.validateSelectedCardsOnError();
        card.showValue = !card.showValue;
        if (card.showValue) {
            this.cardsSelected.push(card);
        }
        else {
            this.cardsSelected = this.cardsSelected.filter(function (c) { return c != card; });
        }
        this.validateSelectedCards();
        this.validateEndOfGame();
    };
    AppComponent.prototype.validateSelectedCards = function () {
        if (this.cardsSelected.length == 2) {
            if (this.cardsSelected[0].value == this.cardsSelected[1].value) {
                this.message = "Match :D";
                this.cardsSelected.forEach(function (card) {
                    card.disabled = true;
                    card.setMatchColor();
                });
                this.cardsSelected = [];
                this.points++;
            }
            else {
                this.message = "Not Match :(";
                this.points--;
                this.error = true;
                this.cardsSelected.forEach(function (c) { return c.setNotMatchColor(); });
            }
        }
    };
    AppComponent.prototype.validateSelectedCardsOnError = function () {
        if (this.error) {
            this.cardsSelected.forEach(function (card) {
                card.showValue = false;
                card.setDefaultColor();
            });
            this.cardsSelected = [];
            this.error = false;
        }
    };
    AppComponent.prototype.validateEndOfGame = function () {
        if (this.cards.filter(function (card) { return !card.showValue; }).length == 0) {
            this.message = "End of the game!";
        }
    };
    AppComponent.prototype.resetGame = function () {
        var _this = this;
        this.cards = [];
        var cardValues = this.cardValuesTemplate.concat(this.cardValuesTemplate);
        cardValues = this.shuffle(cardValues);
        cardValues.forEach(function (val) { return _this.cards.push(new __WEBPACK_IMPORTED_MODULE_0__card_model__["a" /* Card */](val)); });
        this.points = 0;
        this.message = "Choose a card";
        this.error = false;
    };
    // copy/paste from stackoverflow...rsrsrs
    AppComponent.prototype.shuffle = function (array) {
        var currentIndex = array.length;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            var temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/card.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Card; });
var Card = /** @class */ (function () {
    function Card(value) {
        this.value = value;
        this.showValue = false;
        this.disabled = false;
        this.setDefaultColor();
    }
    Card.prototype.setNotMatchColor = function () {
        this.color = 'red';
    };
    Card.prototype.setDefaultColor = function () {
        this.color = 'yellow';
    };
    Card.prototype.setMatchColor = function () {
        this.color = 'green';
    };
    return Card;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map