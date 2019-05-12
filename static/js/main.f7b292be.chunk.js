(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(23)},18:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),c=n.n(o),u=(n(18),n(1)),i=n(2),l=n(4),s=n(3),h=n(5),m=n(11),g=n(10),f=n.n(g),p=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={txt:"",suggestions:[]},n.onTextChanged=function(e){var t=n.props.items,a=e.target.value,r=t.map(function(e){return e.txt}),o=[];if(a.length>0){var c=new RegExp("^".concat(a),"i");o=r.sort().filter(function(e){return c.test(e)})}n.setState(function(){return{suggestions:o,txt:a}})},n.amountChange=function(e){var t=e.target.value;if(0!==Number(t)){var a=t<parseFloat(t).toFixed(3)?t:parseFloat(Math.floor(100*t)/100).toFixed(2);n.props.onAmountChange(a)}else n.props.onAmountChange("")},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"suggestionSelected",value:function(e){this.setState(function(){return{txt:e,suggestions:[]}});var t=e;this.props.onCurrencyChange(t)}},{key:"render",value:function(){var e=this,t=this.state,n=t.suggestions,a=t.txt,o=this.props.amount;return r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{value:isNaN(o)||" "===o?"":o,type:"text",onChange:this.amountChange,required:"required",placeholder:"Your amount",style:{borderBottom:"1.3px solid #09BF72"}}),r.a.createElement("input",{value:a,type:"text",onChange:this.onTextChanged,placeholder:"Your currency",required:"required"}),r.a.createElement("ul",null,0!==n.length?n.map(function(t){return r.a.createElement("li",{key:f()(),onClick:function(){return e.suggestionSelected(t)}},t)}):null))}}]),t}(a.Component),d=(n(21),function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(s.a)(t)).call.apply(e,[this].concat(r)))).state={error:null,isLoading:!0,items:[],change:"1",amount:"",currency_1:"",currency_2:""},n.handleChange_1Change=function(e){n.setState({change:"1",amount:e})},n.handleChange_2Change=function(e){n.setState({change:"2",amount:e})},n.handleCurrency_1Change=function(e){n.setState({currency_1:e})},n.handleCurrency_2Change=function(e){n.setState({currency_2:e})},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t={r030:100,txt:"\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430 \u0433\u0440\u0438\u0432\u043d\u044f",rate:1,cc:"UAH",exchangedate:"forever"};this.itemsList=fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json").then(function(e){return e.json()}).then(function(n){e.setState({items:[t].concat(Object(m.a)(n)),isLoading:!1})}).catch(function(t){return e.setState({error:t,isLoading:!1})})}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.items,a=e.error,o=e.change,c=e.amount,u=e.currency_1,i=e.currency_2,l=function(e,t){return u&&i?n.filter(function(e){return e.txt===u}).map(function(e){return e.rate}):""},s=function(e,t){return u&&i?n.filter(function(e){return e.txt===i}).map(function(e){return e.rate}):""},h=function(e,t){var n=parseFloat(e);if(Number.isNaN(n))return"";var a=t(n);return(Math.round(100*a)/100).toFixed(2).toString()},m="2"===o?h(c,function(e,t,n){return e*s()/l()}):c,g="1"===o?h(c,function(e,t,n){return e*l()/s()}):c;return r.a.createElement(r.a.Fragment,null,a?r.a.createElement("p",null,a.message):null,t?r.a.createElement("h3",null,"Loading..."):r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"Items-Data"}," as at ",n.map(function(e){return 840===e.r030?e.exchangedate:""})),r.a.createElement("div",{className:"App-Container"},r.a.createElement("div",{className:"App-Component"},r.a.createElement("div",{className:"Box"},r.a.createElement(p,{items:n,amount:m,onAmountChange:this.handleChange_1Change,onCurrencyChange:this.handleCurrency_1Change}))),r.a.createElement("h2",null,"="),r.a.createElement("div",{className:"App-Component"},r.a.createElement("div",{className:"Box"},r.a.createElement(p,{items:n,amount:g,onAmountChange:this.handleChange_2Change,onCurrencyChange:this.handleCurrency_2Change}))))),r.a.createElement("p",null,n.map(function(e){return e.txt+", "})))}}]),t}(a.Component)),C=(n(22),function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h6",null,r.a.createElement("b",null,"National Bank of Ukraine")),r.a.createElement("h2",null,"The official exchange rate of currencies"),r.a.createElement(d,null))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.f7b292be.chunk.js.map