webpackJsonp([1],[,,,,,,,,,,,,function(t,e,n){"use strict";var s=n(29),a=n.n(s),o={setToken:function(t,e){localStorage.setItem("authToken",t),localStorage.setItem("authTokenExpiration",e)},destroyToken:function(){localStorage.removeItem("authToken"),localStorage.removeItem("authTokenExpiration")},getToken:function(){var t=localStorage.getItem("authToken"),e=localStorage.getItem("authTokenExpiration");return t&&e?Date.now()>parseInt(e)?(this.destroyToken(),null):t:null},loggedIn:function(){return!!this.getToken()}};e.a=function(t){t.auth=o,a()(t.prototype,{$auth:{get:function(){return t.auth}}})}},function(t,e,n){"use strict";var s=n(2),a=n(87),o=n(69),i=n.n(o),r=n(68),c=n.n(r),l=n(70),u=n.n(l),d=n(72),v=n.n(d),f=n(76),p=n.n(f),m=n(73),h=n.n(m),g=n(71),_=n.n(g),b=n(74),y=n.n(b),x=n(75),w=n.n(x);s.a.use(a.a);var k=new a.a({routes:[{path:"/auth",component:c.a,redirect:"/auth/login",children:[{path:"login",component:i.a,meta:{requiresGuest:!0}},{path:"register",component:u.a,meta:{requiresGuest:!0}}]},{path:"/",component:v.a,redirect:"welcome",children:[{path:"welcome",component:p.a,meta:{requiresAuth:!0}},{path:"listings",component:h.a,meta:{requiresAuth:!0}},{path:"companies",redirect:"/listings"},{path:"company/:symbol",component:_.a,meta:{requiresAuth:!0},children:[{path:"details",component:w.a,meta:{requiresAuth:!0}},{path:"indicators",component:w.a,meta:{requiresAuth:!0}},{path:"news",component:w.a,meta:{requiresAuth:!0}}]},{path:"messages",component:y.a,meta:{requiresAuth:!0}}]}]});e.a=k},function(t,e,n){"use strict";var s=n(2),a=n(89);s.a.use(a.a),e.a=new a.a.Store({state:{currentUser:{}},mutations:{setCurrentUser:function(t,e){t.currentUser=e},clearCurrentUser:function(t){t.currentUser={}}}})},function(t,e,n){function s(t){n(66),n(67)}var a=n(0)(n(18),n(86),s,null,null);t.exports=a.exports},,,function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"auth"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"login",data:function(){return{user:{email:"",password:""}}},methods:{login:function(){this.$http.post("/auth/login",this.user).then(function(t){this.$auth.setToken(t.body.token,Date.now()+144e5),this.$store.commit("setCurrentUser",this.user),alertify.success("You have logged in!"),this.$router.push("/")})},logit:function(){console.log("button pressed!")}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"register",data:function(){return{user:{email:"",password:""},password2:""}},methods:{register:function(){if(this.user.password!==this.password2)return void alertify.error("Passwords do not match!");this.$http.post("/auth/register",this.user).then(function(t){alertify.success("You have registered.  Please login."),this.$router.push("/auth/login")})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"companies",created:function(){this.getCompany(this.$route.params.symbol)},data:function(){return{tabs:["tab-1","tab-2","tab-3"],active:null,text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",companyName:"",symbol:"",sector:"",industry:"",id:"",indicators:{},items:[{item:"1",title:"Company Details",router:"details"},{item:"2",title:"Indicators",router:"indicators"},{item:"3",title:"Research",router:"research"},{item:"4",title:"In the News",router:"news"}]}},computed:{fcfClean:function(){return-999999999999.99==this.indicators.fcf?(console.log("we have an invalid value, let's clean it!"),"Not available"):this.indicators.fcf},roeClean:function(){return-999999999999.99==this.indicators.roe?(console.log("we have an invalid value, let's clean it!"),"Not available"):this.indicators.roe},ev2ebitdaClean:function(){return-999999999999.99==this.indicators.ev2ebitda?(console.log("we have an invalid value, let's clean it!"),"Not available"):this.indicators.ev2ebitda}},watch:{id:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){console.log("watch triggered with id: "),console.log(t),this.$http.get("/indicators/"+t).then(function(t){console.log("Received indicators:"),console.log(t.body),this.indicators=t.body.indicators})})},methods:{getCompany:function(t){console.log("getting company "+t),this.$http.get("/company/"+t).then(function(t){console.log(t.body),this.companyName=t.body.name,this.symbol=t.body.symbol,this.sector=t.body.sector,this.industry=t.body.industry,this.id=t.body.id})},getIndicators:function(t){console.log("getting indicators "+id),this.$http.get("/indicators/"+id).then(function(t){console.log(t.body)})},next:function(){console.log("actives"),console.log(this.active),this.active=this.tabs[(this.tabs.indexOf(this.active)+1)%this.tabs.length],console.log(this.active)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"home",created:function(){console.log("This is the home page")},data:function(){return{activeTab:"home",clipped:!1,drawer:!1,items:[{icon:"home",title:"Home",url:"/welcome"},{icon:"view_list",title:"Listings",url:"/listings"},{icon:"work",title:"Companies",url:"/companies"},{icon:"message",title:"Messages",url:"/messages"},{icon:"close",title:"Logout",url:"/messages"}],miniVariant:!1}},methods:{logout:function(){this.$auth.destroyToken(),this.$router.push("/auth")},setActiveTab:function(t){this.activeTab=t},navigate:function(t,e){"Logout"===t?this.logout():this.$router.push(e)}},computed:{classObject:function(){return console.log("computed property"),console.log(this.$route.path),{active:!0}},user:function(){return this.$store.state.currentUser}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(31),a=n.n(s);e.default={name:"listings",data:function(){var t;return t={search:"",rowsPerPageItems:[10,25,100,{text:"All",value:-1}]},a()(t,"search",""),a()(t,"totalItems",0),a()(t,"items",[]),a()(t,"loading",!1),a()(t,"pagination",{}),a()(t,"headers",[{text:"Name",left:!0,sortable:!0,value:"name"},{text:"Ticker",value:"symbol",left:!0},{text:"Industry",value:"industry",left:!0},{text:"Sector",value:"sector",left:!0}]),t},created:function(){this.items=[],this.getCompanies(1)},methods:{getCompanies:function(t){this.$http.get("/company/?count=10000").then(function(t){console.log("Rows per page "+this.pagination.rowsPerPage),this.items=t.body.companies,this.totalItems=t.body.companies.length,this.pagination.rowsPerPage=10,console.log("Rows per page2 "+this.pagination.rowsPerPage),console.log("companies retrieved"),console.log(t),console.log(this.items),console.log(this.items.length)})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"messages"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"tab1"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"welcome"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),a=n(17),o=n.n(a),i=n(15),r=n.n(i),c=n(13),l=n(16),u=n(12),d=n(14);s.a.use(l.a),s.a.use(u.a),s.a.use(o.a),s.a.config.productionTip=!1,alertify.defaults.notifier.position="top-right",s.a.http.interceptors.push(function(t,e){if("/"===t.url[0]){t.url="https://kflavin-stocksweb.herokuapp.com/api/2.0"+t.url,console.log("Your request URL is "+t.url);var n=s.a.auth.getToken();n&&t.headers.set("Authorization","Bearer "+n)}e(function(t){400!=t.status&&401!=t.status||alertify.error(t.body.message)})}),c.a.beforeEach(function(t,e,n){t.matched.some(function(t){return t.meta.requiresGuest})&&s.a.auth.loggedIn()?n({path:"/newsfeed"}):t.matched.some(function(t){return t.meta.requiresAuth})&&!s.a.auth.loggedIn()?n({path:"/auth/login"}):n()}),new s.a({el:"#app",router:c.a,store:d.a,template:"<App/>",components:{App:r.a}})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){function s(t){n(57)}var a=n(0)(n(19),n(77),s,null,null);t.exports=a.exports},function(t,e,n){function s(t){n(65)}var a=n(0)(n(20),n(85),s,null,null);t.exports=a.exports},function(t,e,n){function s(t){n(59)}var a=n(0)(n(21),n(79),s,null,null);t.exports=a.exports},function(t,e,n){function s(t){n(63)}var a=n(0)(n(22),n(83),s,"data-v-49ad0d4e",null);t.exports=a.exports},function(t,e,n){function s(t){n(58)}var a=n(0)(n(23),n(78),s,"data-v-10c71688",null);t.exports=a.exports},function(t,e,n){function s(t){n(64)}var a=n(0)(n(24),n(84),s,"data-v-746ce3cc",null);t.exports=a.exports},function(t,e,n){function s(t){n(61)}var a=n(0)(n(25),n(81),s,"data-v-40eecfae",null);t.exports=a.exports},function(t,e,n){function s(t){n(62)}var a=n(0)(n(26),n(82),s,"data-v-481d86ce",null);t.exports=a.exports},function(t,e,n){function s(t){n(60)}var a=n(0)(n(27),n(80),s,"data-v-1ed2f3d6",null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"auth"}},[n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-4 col-md-offset-4 authForm"},[n("h2",{staticClass:"text-center"},[t._v("stocks-web")]),t._v(" "),n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-navigation-drawer",{attrs:{persistent:"","mini-variant":t.miniVariant,clipped:!0},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.items,function(e,s){return n("v-list-item",{key:s,on:{click:function(n){t.navigate(e.title,e.url)}}},[n("v-list-tile",{attrs:{value:"true"}},[n("v-list-tile-action",[n("v-icon",{attrs:{light:""},domProps:{innerHTML:t._s(e.icon)}})],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",{domProps:{textContent:t._s(e.title)}})],1)],1)],1)}))],1),t._v(" "),n("v-toolbar",{staticClass:"primary",attrs:{dark:""}},[n("v-toolbar-side-icon",{nativeOn:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),n("v-toolbar-title",{staticClass:"white--text"},[t._v("Stock Screener")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("assessment")])],1),t._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("apps")])],1),t._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("refresh")])],1),t._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("more_vert")])],1)],1),t._v(" "),n("main",[n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("main",[n("v-card",{staticClass:"grey lighten-4 elevation-10"},[n("v-card-text",[n("v-container",[n("h5",[t._v("Register")]),t._v(" "),n("v-layout",[n("v-flex",{attrs:{xs4:""}},[n("v-subheader",[t._v("Email")])],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-text-field",{attrs:{name:"Email",label:"Enter your email address",id:"Email"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.register(e)}},model:{value:t.user.email,callback:function(e){t.user.email=e},expression:"user.email"}})],1)],1),t._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs4:""}},[n("v-subheader",[t._v("Password")])],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-text-field",{attrs:{name:"password",label:"Enter your password",type:"password"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.register(e)}},model:{value:t.user.password,callback:function(e){t.user.password=e},expression:"user.password"}})],1)],1),t._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs4:"","offset-xs4":""}},[n("v-text-field",{attrs:{name:"password2",label:"Enter your password (again)",type:"password"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.register(e)}},model:{value:t.password2,callback:function(e){t.password2=e},expression:"password2"}})],1)],1),t._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs4:"","offset-xs4":""}},[n("v-btn",{attrs:{dark:"",raised:""},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.register(e)},click:function(e){t.register(e)}}},[t._v("Register!")]),t._v(" "),n("p",{staticClass:"text-center"},[t._v("\n              If you already have an account, "),n("router-link",{attrs:{to:"/auth/login"}},[t._v("sign in")]),t._v(".\n            ")],1)],1)],1)],1)],1)],1)],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-layout",[n("h4",[t._v("Home")])]),t._v(" "),n("p",[t._v("Let's buy some penny stocks!")])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-layout",[n("h4",[t._v("Messages")])])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._v("\n  Some text here from the component...\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h4",{staticClass:"ml-3 mt-3"},[t._v(t._s(this.companyName)+" ("+t._s(this.symbol)+")")]),t._v(" "),n("v-tabs",{attrs:{dark:""},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[n("v-tabs-bar",{staticClass:"blue lighten-3",attrs:{slot:"activators"},slot:"activators"},[t._l(t.items,function(e){return n("v-tabs-item",{key:e,attrs:{href:"#"+e.router,ripple:""}},[t._v("\n        "+t._s(e.title)+"\n      ")])}),t._v(" "),n("v-tabs-slider",{staticClass:"blue darken-3"})],2),t._v(" "),n("v-tabs-content",{key:"details",attrs:{id:"details"}},[n("v-card",[n("v-card-text",[t._v("details")])],1)],1),t._v(" "),n("v-tabs-content",{key:"indicators",attrs:{id:"indicators"}},[n("v-card",[n("v-card-text",[t._v("\n          ROE: "+t._s(t.indicators.roe)+" "),n("br"),t._v("\n          EV/EBITDA: "+t._s(t.indicators.ev2ebitda)+" "),n("br"),t._v("\n          Free Cash Flow: "+t._s(t.indicators.fcf)+" "),n("br"),t._v(" "),n("br"),t._v("Cleaned versions"),n("br"),t._v("\n          ROE: "+t._s(t.roeClean)+" "),n("br"),t._v("\n          EV/EBITDA: "+t._s(t.ev2ebitdaClean)+" "),n("br"),t._v("\n          Free Cash Flow: "+t._s(t.fcfClean)+" "),n("br")])],1)],1),t._v(" "),n("v-tabs-content",{key:"research",attrs:{id:"research"}},[n("v-card",[n("v-card-text",[n("a",{attrs:{href:"https://whalewisdom.com/stock/"+this.symbol}},[t._v("Whale Wisdom")])])],1)],1),t._v(" "),n("v-tabs-content",{key:"news",attrs:{id:"news"}},[n("v-card",[n("v-card-text",[t._v("Items in the news")])],1)],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-layout",[n("v-flex",{attrs:{xs12:"","offset-xs2":""}},[n("h4",[t._v("Full Company Listings")])])],1),t._v(" "),n("v-layout",[n("v-flex",{attrs:{xs12:"",sm10:"","offset-sm1":""}},[n("v-card",[n("v-card-title",[n("v-spacer"),t._v(" "),n("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),n("v-data-table",{staticClass:"elevation-1 ml-10 mt-10",attrs:{headers:t.headers,items:t.items,search:t.search,pagination:t.pagination,"rows-per-page-items":t.rowsPerPageItems},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[n("td",[n("router-link",{attrs:{to:"/company/"+e.item.symbol}},[t._v(t._s(e.item.name))])],1),t._v(" "),n("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.symbol))]),t._v(" "),n("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.industry))]),t._v(" "),n("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.sector))])]}}])})],1)],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("main",[n("v-card",{staticClass:"grey lighten-4 elevation-10"},[n("v-card-text",[n("v-container",[n("v-layout",[n("v-flex",{attrs:{xs4:""}},[n("v-subheader",[t._v("Email")])],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-text-field",{attrs:{name:"Email",label:"Enter your email or username",id:"Email"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.login(e)}},model:{value:t.user.email,callback:function(e){t.user.email=e},expression:"user.email"}})],1)],1),t._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs4:""}},[n("v-subheader",[t._v("Password")])],1),t._v(" "),n("v-flex",{attrs:{xs4:""}},[n("v-text-field",{attrs:{name:"password",label:"Enter your password",type:"password"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.login(e)}},model:{value:t.user.password,callback:function(e){t.user.password=e},expression:"user.password"}}),t._v(" "),n("v-btn",{attrs:{primary:"",dark:"",raised:""},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.login(e)},click:function(e){t.login(e)}}},[t._v("Login\n              "),n("v-icon",{attrs:{light:"",right:""}},[t._v("check_circle")])],1),t._v(" "),n("p",{staticClass:"text-center"},[t._v("\n                Don't have an account?  "),n("router-link",{attrs:{to:"/auth/register"}},[t._v("Sign up!")])],1)],1)],1)],1)],1)],1)],1)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("router-view")},staticRenderFns:[]}},,,,,function(t,e){}],[28]);
//# sourceMappingURL=app.fd897b6fd3d53eecd5fb.js.map