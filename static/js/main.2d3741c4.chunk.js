(this.webpackJsonpcards=this.webpackJsonpcards||[]).push([[0],{164:function(e,t,r){},165:function(e,t,r){},292:function(e,t,r){"use strict";r.r(t),r.d(t,"history",(function(){return Re}));var n,a=r(0),c=r.n(a),s=r(9),i=r.n(s),o=(r(164),r(165),r(15)),d=r(11),l=r(323),u=r(343),j=r(326),b=r(327),h=r(337),O=r(328),p=r(340),m=r(330),x=r(338),f=r(322),g=r(146),S=Object(g.a)({palette:{primary:{main:"#00695f"},secondary:{main:"#009688"}}}),v=r(41),y=r(12),w=r(24),P=r.n(w),I=r(46),T=r(139),_=r.n(T).a.create(Object(d.a)({baseURL:"https://neko-back.herokuapp.com/2.0/"},{withCredentials:!0})),E=function(e){return _.post("auth/login",e).then((function(e){return e.data}))},R=function(){return _.delete("auth/me").then((function(e){return e.data}))},A=function(e,t){return _.post("auth/register",{email:e,password:t}).then((function(e){return e.data}))},k=function(e){return _.post("/auth/forgot",{email:e,from:"front-admin <serhioromanchuk@gmail.com>",message:"<div style=\"background-color: lime; padding: 15px\">\t\n\t                         password recovery link: \t\t\n                            \x3c!-- <a href='https://borec22.github.io/cards/#/set-new-password/$token$'>link</a>--\x3e\n\t                         <a href='http://localhost:3000/set-new-password/$token$'>link</a>\n\t                      </div>"}).then((function(e){return e.data}))},N=function(e,t){return _.post("auth/set-new-password",{password:e,resetPasswordToken:t}).then((function(e){return e.data}))},L=function(){return _.post("auth/me").then((function(e){return e.data}))},H=function(e,t){var r=e.response?e.response.data.error:e.message;t(F(r)),t(C("failed"))};!function(e){e.SET_STATUS="APP/SET-STATUS",e.SET_ERROR="APP/SET-ERROR",e.SET_IS_INITIALIZED="APP/SET_IS_INITIALIZED"}(n||(n={}));var D,G={status:"idle",error:null,isInitialized:!1},C=function(e){return{type:n.SET_STATUS,status:e}},F=function(e){return{type:n.SET_ERROR,error:e}};!function(e){e.SET_IS_LOGGED_IN="AUTH/SET-IS-LOGGED-IN",e.SET_USER_DATA="AUTH/SET_USER_DATA",e.SET_IS_REGISTERED_SUCCESS="AUTH/SET_IS_REGISTERED_SUCCESS"}(D||(D={}));var U,q={isLoggedIn:!1,userData:null,isRegisteredSuccess:!1},z=function(e){return{type:D.SET_IS_LOGGED_IN,payload:{isLoggedIn:e}}},V=function(e){return{type:D.SET_USER_DATA,payload:{userData:e}}},W=function(e){return{type:D.SET_IS_REGISTERED_SUCCESS,payload:{isRegisteredSuccess:e}}},B=r(20),M=r(27),Z=M.a().shape({email:M.b().email("Invalid email address").required("Required"),password:M.b().min(7,"Password must be more than 7 characters").required("Required")}),$=M.a().shape({email:M.b().email("Invalid email address").required("Required"),firstPassword:M.b().min(7,"Password must be more than 7 characters").required("Required"),secondPassword:M.b().min(7,"Password must be more than 7 characters").required("Required")}),J=M.a().shape({email:M.b().email("Invalid email address").required("Required")}),X=M.a().shape({firstPassword:M.b().min(7,"Password must be more than 7 characters").required("Required"),secondPassword:M.b().min(7,"Password must be more than 7 characters").required("Required")}),K=r(2),Q=function(){console.log("render SignIn component");var e=Object(y.b)(),t=Object(y.c)((function(e){return e.auth.isLoggedIn})),r=Object(v.a)({initialValues:{email:"",password:"",rememberMe:!1},validationSchema:Z,onSubmit:function(t){var r;e((r=t,function(){var e=Object(I.a)(P.a.mark((function e(t){var n;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(C("loading")),e.next=4,E(r);case 4:n=e.sent,t(V(n)),t(z(!0)),t(C("succeeded")),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),H(e.t0,t);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()))}});return t?Object(K.jsx)(o.a,{to:U.PROFILE_PATH}):Object(K.jsx)(f.a,{theme:S,children:Object(K.jsx)(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"80vh"},children:Object(K.jsx)(l.a,{item:!0,xs:4,children:Object(K.jsx)("form",{onSubmit:r.handleSubmit,children:Object(K.jsxs)(u.a,{style:{width:"300px"},children:[Object(K.jsxs)(j.a,{children:[Object(K.jsx)("p",{children:"Use common test account credentials:"}),Object(K.jsx)("p",{children:"Email: nya-admin@nya.nya"}),Object(K.jsx)("p",{children:"Password: 1qazxcvBG"})]}),Object(K.jsxs)(b.a,{children:[Object(K.jsx)(h.a,Object(d.a)({label:"Email",defaultValue:"nya-admin@nya.nya",margin:"normal",color:"secondary"},r.getFieldProps("email"))),r.touched&&r.errors.email&&Object(K.jsx)("div",{style:{color:"red"},children:r.errors.email}),Object(K.jsx)(h.a,Object(d.a)({type:"password",label:"Password",defaultValue:"1qazxcvBG",margin:"normal",color:"secondary"},r.getFieldProps("password"))),r.touched&&r.errors.password&&Object(K.jsx)("div",{style:{color:"red"},children:r.errors.password}),Object(K.jsx)(O.a,{label:"Remember me",control:Object(K.jsx)(p.a,Object(d.a)({color:"secondary"},r.getFieldProps("rememberMe")))}),Object(K.jsx)(m.a,{type:"submit",variant:"contained",color:"secondary",style:{marginTop:"20px"},children:"Sign In"}),Object(K.jsx)(j.a,{style:{marginTop:"20"},children:Object(K.jsxs)(x.a,{mt:5,children:[Object(K.jsxs)("p",{children:["Doesn't have a account? ",Object(K.jsx)(B.b,{to:U.REGISTER_PATH,children:"sign up"})]}),Object(K.jsxs)("p",{children:["Forgot ",Object(K.jsx)(B.b,{to:U.FORGOT_PATH,onClick:function(){e(C("idle"))},children:" password? "})]})]})})]})]})})})})})},Y=r(331),ee=r.p+"static/media/avatar-default.04fa9609.png",te=c.a.memo((function(e){var t=e.userProfileData,r=e.isLoggedIn;return console.log("render Profile component"),r?Object(K.jsx)(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"80vh"},children:Object(K.jsx)(l.a,{item:!0,xs:8,children:t&&Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)("img",{style:{borderRadius:"50%",height:300,width:300,display:"block",marginLeft:"auto",marginRight:"auto"},src:t.avatar?t.avatar:ee,alt:""}),Object(K.jsxs)(x.a,{mt:4,fontSize:"25px",children:[Object(K.jsx)("strong",{children:"username:"}),Object(K.jsxs)("span",{style:{paddingLeft:"20"},children:["  ",t.name," "]})]})]})})}):Object(K.jsx)(o.a,{to:U.SIGN_IN_PATH})})),re=function(){var e=Object(y.c)((function(e){return e.auth})),t=e.userData,r=e.isLoggedIn;return Object(K.jsx)(te,{userProfileData:t,isLoggedIn:r})},ne=function(){var e=Object(y.b)(),t=Object(y.c)((function(e){return e.auth.isRegisteredSuccess}));Object(a.useEffect)((function(){return function(){e(W(!1))}}));var r=Object(v.a)({initialValues:{email:"",firstPassword:"",secondPassword:""},validationSchema:$,onSubmit:function(t){var r,n;t.firstPassword!==t.secondPassword?e(F("Passwords don't match!")):e((r=t.email,n=t.firstPassword,function(){var e=Object(I.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(C("loading")),e.next=4,A(r,n);case 4:e.sent,t(W(!0)),t(C("succeeded")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),H(e.t0,t);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()))}});return t?Object(K.jsx)(o.a,{to:U.SIGN_IN_PATH}):Object(K.jsx)(f.a,{theme:S,children:Object(K.jsx)(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"80vh"},children:Object(K.jsx)(l.a,{item:!0,xs:4,children:Object(K.jsx)("form",{onSubmit:r.handleSubmit,children:Object(K.jsx)(u.a,{style:{width:"300px"},children:Object(K.jsxs)(b.a,{children:[Object(K.jsx)(h.a,Object(d.a)({label:"Email",margin:"normal",color:"secondary"},r.getFieldProps("email"))),r.touched&&r.errors.email&&Object(K.jsx)("div",{style:{color:"red"},children:r.errors.email}),Object(K.jsx)(h.a,Object(d.a)({type:"password",label:"Password",margin:"normal",color:"secondary"},r.getFieldProps("firstPassword"))),r.touched&&r.errors.firstPassword&&Object(K.jsx)("div",{style:{color:"red"},children:r.errors.firstPassword}),Object(K.jsx)(h.a,Object(d.a)({type:"password",label:"Confirm password",margin:"normal",color:"secondary"},r.getFieldProps("secondPassword"))),r.touched.secondPassword&&r.errors.secondPassword&&Object(K.jsx)("div",{style:{color:"red"},children:r.errors.secondPassword}),Object(K.jsx)(m.a,{type:"submit",variant:"contained",color:"secondary",style:{marginTop:"20px"},children:"Sign Up"}),Object(K.jsx)(j.a,{children:Object(K.jsx)(x.a,{mt:5,children:Object(K.jsx)("p",{style:{textAlign:"center"},children:Object(K.jsx)(B.b,{to:U.SIGN_IN_PATH,children:"sign in"})})})})]})})})})})})},ae=c.a.memo((function(e){console.log("render forgot password");var t=Object(y.b)(),r=Object(y.c)((function(e){return e.app.status})),n=Object(v.a)({initialValues:{email:""},validationSchema:J,onSubmit:function(e){var r=e.email;t(function(e){return function(){var t=Object(I.a)(P.a.mark((function t(r){return P.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r(C("loading")),t.next=4,k(e);case 4:t.sent,r(C("succeeded")),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),H(t.t0,r);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}(r))}});return Object(K.jsx)(f.a,{theme:S,children:Object(K.jsx)(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"80vh"},children:Object(K.jsx)(l.a,{item:!0,xs:8,children:"succeeded"===r?Object(K.jsxs)("div",{style:{backgroundColor:"#d3efe0",padding:"20px",fontSize:"1.5em"},children:[Object(K.jsx)("h1",{children:"Check your email"}),Object(K.jsx)("p",{children:"We've sent on email to the address provided. Click the link in the email to reset your password."}),Object(K.jsx)("p",{children:"If you don't see the email, check other places it might be; kike your spam, social, or other folders"})]}):Object(K.jsx)("form",{onSubmit:n.handleSubmit,children:Object(K.jsx)(u.a,{style:{width:"300px"},children:Object(K.jsxs)(b.a,{children:[Object(K.jsx)(h.a,Object(d.a)({label:"Email",margin:"normal",color:"secondary"},n.getFieldProps("email"))),n.touched&&n.errors.email&&Object(K.jsx)("div",{style:{color:"red"},children:n.errors.email}),Object(K.jsx)(m.a,{type:"submit",variant:"contained",color:"secondary",style:{marginTop:"20px"},children:"Send"}),Object(K.jsx)(j.a,{children:Object(K.jsx)(x.a,{mt:5,children:Object(K.jsx)("p",{style:{textAlign:"center"},children:Object(K.jsx)(B.b,{to:U.SIGN_IN_PATH,children:"sign in"})})})})]})})})})})})})),ce=c.a.memo((function(e){console.log("render recovery password");var t=Object(y.b)(),r=Object(o.g)().token,n=Object(y.c)((function(e){return e.app.status})),a=Object(v.a)({initialValues:{firstPassword:"",secondPassword:""},validationSchema:X,onSubmit:function(e){var n=e.firstPassword;n!==e.secondPassword?t(F("Passwords don't match!")):r&&t(function(e,t){return function(){var r=Object(I.a)(P.a.mark((function r(n){return P.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,n(C("loading")),r.next=4,N(e,t);case 4:r.sent,n(C("succeeded")),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),H(r.t0,n);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(e){return r.apply(this,arguments)}}()}(n,r))}});return"succeeded"===n?Object(K.jsx)(o.a,{to:U.SIGN_IN_PATH}):Object(K.jsx)(f.a,{theme:S,children:Object(K.jsx)(l.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"80vh"},children:Object(K.jsx)(l.a,{item:!0,xs:8,children:Object(K.jsx)("form",{onSubmit:a.handleSubmit,children:Object(K.jsx)(u.a,{style:{width:"300px"},children:Object(K.jsxs)(b.a,{children:[Object(K.jsx)(h.a,Object(d.a)({label:"Password",type:"password",margin:"normal",color:"secondary"},a.getFieldProps("firstPassword"))),a.touched&&a.errors.firstPassword&&Object(K.jsx)("div",{style:{color:"red"},children:a.errors.firstPassword}),Object(K.jsx)(h.a,Object(d.a)({label:"Confirm password",type:"password",margin:"normal",color:"secondary"},a.getFieldProps("secondPassword"))),a.touched&&a.errors.secondPassword&&Object(K.jsx)("div",{style:{color:"red"},children:a.errors.secondPassword}),Object(K.jsx)(m.a,{type:"submit",variant:"contained",color:"secondary",style:{marginTop:"20px"},children:"Recovery password"}),Object(K.jsx)(j.a,{children:Object(K.jsx)(x.a,{mt:5,children:Object(K.jsx)("p",{style:{textAlign:"center"},children:Object(K.jsx)(B.b,{to:U.SIGN_IN_PATH,children:"sign in"})})})})]})})})})})})}));!function(e){e.SIGN_IN_PATH="/sign-in",e.PROFILE_PATH="/profile",e.REGISTER_PATH="/register",e.FORGOT_PATH="/forgot",e.SET_NEW_PASSWORD_PATH="/set-new-password/:token?"}(U||(U={}));var se=function(){return Object(K.jsx)(Y.a,{fixed:!0,children:Object(K.jsxs)(o.d,{children:[Object(K.jsx)(o.b,{exact:!0,path:"/",render:function(){return Object(K.jsx)(o.a,{to:U.PROFILE_PATH})}}),Object(K.jsx)(o.b,{path:U.PROFILE_PATH,render:function(){return Object(K.jsx)(re,{})}}),Object(K.jsx)(o.b,{path:U.SIGN_IN_PATH,render:function(){return Object(K.jsx)(Q,{})}}),Object(K.jsx)(o.b,{path:U.REGISTER_PATH,render:function(){return Object(K.jsx)(ne,{})}}),Object(K.jsx)(o.b,{path:U.FORGOT_PATH,render:function(){return Object(K.jsx)(ae,{})}}),Object(K.jsx)(o.b,{path:U.SET_NEW_PASSWORD_PATH,render:function(){return Object(K.jsx)(ce,{})}})]})})},ie=r(332),oe=r(345),de=r(333),le=r(334),ue=r(329),je=r(295),be=r(335),he=r(342),Oe=r(339);function pe(e){return Object(K.jsx)(Oe.a,Object(d.a)({elevation:6,variant:"filled"},e))}function me(){var e=Object(y.b)(),t=Object(y.c)((function(e){return e.app.error})),r=function(t,r){"clickaway"!==r&&e(F(null))};return Object(K.jsx)(he.a,{open:!!t,autoHideDuration:6e3,onClose:r,children:Object(K.jsx)(pe,{onClose:r,severity:"error",children:t})})}var xe=Object(ie.a)((function(e){return Object(oe.a)({root:{flexGrow:1},logo:{marginRight:e.spacing(3)},links:{flexGrow:1},navLink:{color:"white",textDecoration:"none",paddingLeft:"15px"},selectedLink:{color:"#4caf50   "}})})),fe=function(){console.log("Header component");var e=xe(),t=Object(y.b)(),r=Object(y.c)((function(e){return e.app.status})),n=Object(y.c)((function(e){return e.auth.isLoggedIn}));return Object(K.jsxs)(f.a,{theme:S,children:[Object(K.jsx)(me,{}),Object(K.jsx)("div",{className:e.root,children:Object(K.jsx)(de.a,{position:"static",color:"primary",children:Object(K.jsxs)(le.a,{children:[Object(K.jsx)(ue.a,{edge:"start",className:e.logo,color:"inherit","aria-label":"logo",children:"CARDS"}),Object(K.jsxs)(je.a,{variant:"h6",className:e.links,children:[Object(K.jsx)(B.b,{activeClassName:e.selectedLink,to:U.PROFILE_PATH,className:e.navLink,children:"Profile"}),Object(K.jsx)(B.b,{activeClassName:e.selectedLink,to:"dfdf",className:e.navLink,children:"News"})]}),Object(K.jsx)(je.a,{variant:"h6"}),!n&&Object(K.jsx)(m.a,{color:"inherit",onClick:function(){Re.push(U.SIGN_IN_PATH)},children:"Login"}),n&&Object(K.jsx)(m.a,{color:"inherit",onClick:function(){t(function(){var e=Object(I.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(C("loading")),e.next=4,R();case 4:e.sent,t(z(!1)),t(C("succeeded")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),H(e.t0,t);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}())},children:"Logout"})]})})}),"loading"===r&&Object(K.jsx)(be.a,{})]})},ge=function(){return Object(K.jsxs)(K.Fragment,{children:[Object(K.jsx)(fe,{}),Object(K.jsx)(se,{})]})},Se=r(336);var ve=function(){var e=Object(y.b)(),t=Object(y.c)((function(e){return e.app.isInitialized}));return Object(a.useEffect)((function(){e(function(){var e=Object(I.a)(P.a.mark((function e(t,r){var a;return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(C("loading")),e.next=4,L();case 4:a=e.sent,r().auth.userData||t(V(a)),t(z(!0)),t(C("succeeded")),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),H(e.t0,t);case 14:return e.prev=14,t((c=!0,{type:n.SET_IS_INITIALIZED,isInitialized:c})),e.finish(14);case 17:case"end":return e.stop()}var c}),e,null,[[0,11,14,17]])})));return function(t,r){return e.apply(this,arguments)}}())}),[e]),t?Object(K.jsx)("div",{className:"App",children:Object(K.jsx)(ge,{})}):Object(K.jsx)(f.a,{theme:S,children:Object(K.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(K.jsx)(Se.a,{color:"primary"})})})},ye=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,346)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;r(e),n(e),a(e),c(e),s(e)}))},we=r(49),Pe=r(144),Ie=Object(we.c)({app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case n.SET_STATUS:return Object(d.a)(Object(d.a)({},e),{},{status:t.status});case n.SET_ERROR:return Object(d.a)(Object(d.a)({},e),{},{error:t.error});case n.SET_IS_INITIALIZED:return Object(d.a)(Object(d.a)({},e),{},{isInitialized:t.isInitialized});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D.SET_IS_LOGGED_IN:case D.SET_IS_REGISTERED_SUCCESS:case D.SET_USER_DATA:return Object(d.a)(Object(d.a)({},e),t.payload);default:return e}}}),Te=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose,_e=Object(we.d)(Ie,Te(Object(we.a)(Pe.a))),Ee=r(145),Re=r.n(Ee)()();i.a.render(Object(K.jsx)(c.a.StrictMode,{children:Object(K.jsx)(B.a,{children:Object(K.jsx)(y.a,{store:_e,children:Object(K.jsx)(ve,{})})})}),document.getElementById("root")),ye()}},[[292,1,2]]]);
//# sourceMappingURL=main.2d3741c4.chunk.js.map