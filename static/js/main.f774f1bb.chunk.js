(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{287:function(t,e,n){t.exports=n(615)},493:function(t,e,n){},494:function(t,e,n){},615:function(t,e,n){"use strict";n.r(e);n(288),n(298);var a=n(0),r=n.n(a),i=n(59),o=n.n(i),s=(n(493),n(17)),c=n(18),l=n(21),u=n(19),h=n(20),d=(n(494),n(174)),p=n.n(d),m=n(271),f=n(105),b=n(70),v=n(130),g=n.n(v),y=(n(161),n(495),g.a.initializeApp({apiKey:"AIzaSyBczyXF8LB_35hI6awLk4lyYfjNPzN5bIo",authDomain:"habit-tracker-ade9c.firebaseapp.com",databaseURL:"https://habit-tracker-ade9c.firebaseio.com",projectId:"habit-tracker-ade9c",storageBucket:"habit-tracker-ade9c.appspot.com",messagingSenderId:"552514933256",appId:"1:552514933256:web:24f0cee2d4931841"})),k=n(38),x=n.n(k),w=n(618),j=n(25),O=n(26),E=n(617);function C(){var t=Object(j.a)(["\n    display: flex;\n    justify-content: center; \n    align-items: center; \n    flex-direction: column;\n    height: 90vh;\n    "]);return C=function(){return t},t}var M=Object(O.a)(E.a)(C()),D=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement(M,null,r.a.createElement("p",null,"Wczytywanie..."),r.a.createElement(w.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Wczytywanie...")))}}]),e}(a.Component),S=n(620),I=(n(499),n(619)),T=n(621),H=n(274),N=n.n(H),P=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement(N.a,{data:[{value:this.props.percentage,color:"#28a745",startOffset:0}],cy:50,cx:50,totalValue:100,lineWidth:20,startAngle:270,rounded:!0,label:function(t){var e=t.data,n=t.dataIndex;return Math.round(e[n].percentage)+"%"},labelStyle:{fontSize:"25px",fontFamily:"sans-serif"},labelPosition:0,style:{width:"100px",height:"100px",margin:"10px"}})}}]),e}(r.a.Component),F=n(275),z=n.n(F),A=n(623),R=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement(A.a,{style:{overflowY:"auto"},show:this.props.showmodal,onHide:this.props.handleCloseModal},r.a.createElement(A.a.Header,{closeButton:!0},r.a.createElement(A.a.Title,null,"Potwierd\u017a usuni\u0119cie")),r.a.createElement(A.a.Body,null,"Czy na pewno chcesz usun\u0105\u0107 ten nawyk?"),r.a.createElement(A.a.Footer,null,r.a.createElement(I.a,{variant:"secondary",onClick:this.props.handleCloseModal},"Anuluj"),r.a.createElement(I.a,{variant:"danger",onClick:this.props.handleConfirm},"Tak")))}}]),e}(r.a.Component);function B(){var t=Object(j.a)(["\nborder-radius: 5px;\nbackground: #eee;\n// border: 1px solid #28a745;\nwidth: 30px;\nheight: 30px;\nflex: 0 0 30px;\npadding: 0;\ntransition: background ease-in-out .09s;\nmargin: 2px;\ncursor: pointer;\nuser-select: none;\nline-height: 30px;\n&:hover {\n\tbackground: rgb(40, 167, 69, .5);\n\tcolor: #000;\n}\n"]);return B=function(){return t},t}function W(){var t=Object(j.a)(["\nmin-width: 245px;\nflex-wrap: wrap;\nalignItems: center;\ndisplay: flex; \n"]);return W=function(){return t},t}function U(){var t=Object(j.a)(["\ndisplay: inline-block;\nmax-width: 80%;\nborder: 2px solid transparent;\nfont-weight: bold;\nmargin-bottom: 5px;\n"]);return U=function(){return t},t}function Y(){var t=Object(j.a)(["\ntext-align: left;\nmin-height: 40px;\nborder-bottom: 1px solid #ddd;\nmargin-bottom: 15px;\n"]);return Y=function(){return t},t}function V(){var t=Object(j.a)(["\nfloat: right;\ncolor: #ddd;\n"]);return V=function(){return t},t}function _(){var t=Object(j.a)(["\ndisplay: flex;\njustify-content: center;\nalign-items: center;\nflex-direction: column;\n@media screen and (max-width: 769px){\n\tmargin-top: 20px\n\n}\n"]);return _=function(){return t},t}function K(){var t=Object(j.a)(["\npadding: 20px;\nborder: 1px solid #ddd;\nmargin: 10px -10px; \nbackground: #fff;\nborder-radius: 5px;\nuser-select: none;\nbox-shadow: 0px 2px 3px rgba(0,0,0,.03), 1px 2px 2px rgba(0,0,0,.03), -1px -2px 2px rgba(0,0,0,.05);\n\n@media screen and (max-width: 769px){\n\tmargin: 10px\n}\n.fa {\n\tdisplay: none\n}\n.task {\n    border-radius: 5px;\n    background: #eee;\n\t// border: 1px solid #28a745;\n\twidth: 30px;\n\theight: 30px;\n\tflex: 0 0 30px;\n\tpadding: 0;\n\ttransition: background ease-in-out .09s\n\t&:hover {\n\t\tbackground: rgb(40, 167, 69, .5);\n\t\tcolor: #000;\n\t}\n}\n.taskDone.col{\n\tcolor: white;\n\tbackground: #28a745;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\t&:hover {\n\t\tbackground: rgb(40, 167, 69, .5);\n\t}\n}\n@media (hover: none) {\n\t.taskDone.col:hover {\n\t\tbackground: #28a745;\n\t}\n}\n.input-title {\n\tmargin-left: -7px;\n\tpadding-left: 8px;\n\toutline: none;\n\tborder: 1px solid #007bff;\n\twidth: 75%;\n\tfont-weight: bold;\n\t@media screen and (max-width: 769px){\n\t\twidth: 60%\n\n\t}\n}\n"]);return K=function(){return t},t}var L=O.a.div(K()),J=Object(O.a)(S.a)(_()),q=O.a.span(V()),G=O.a.div(Y()),X=O.a.span(U()),$=O.a.div(W()),Q=Object(O.a)(S.a)(B()),Z=function(t){function e(t){var n;Object(s.a)(this,e),(n=Object(l.a)(this,Object(u.a)(e).call(this,t))).getFormatedDaysArray=function(){for(var t=x()().daysInMonth(),e=[];t;){var n=x()().date(t).toISOString().split("T")[0];e.push(n),t--}return e.reverse()},n.checkIfActive=function(t){return!!n.props.habit.dates&&"undefined"!==typeof z()(n.props.habit.dates,{pushDate:t})},n.addDate=function(t){var e=t;n.datesFirebaseRef.push().set({pushDate:e}).then(function(){return n.addPoint()})},n.removeDate=function(t){n.datesFirebaseRef.orderByChild("pushDate").equalTo(t).once("value",function(t){var e,a=t.val();a&&(e=Object.keys(a)[0]),n.datesFirebaseRef.child(e).remove()}).then(function(){n.subtractPoint()})},n.addPoint=function(){n.setPercentage()},n.subtractPoint=function(){n.setPercentage()},n.changeIntoPercentage=function(t,e){return Math.ceil(100*t/e)},n.setPercentage=function(){n.datesFirebaseRef.orderByChild("pushDate").startAt(n.state.currMonthDate).once("value",function(t){var e=t.val(),a=[];for(var r in e)a.push(r);var i=a.length;n.setState({pointsFB:i})}).then(function(){var t=n.changeIntoPercentage(n.state.pointsFB,x()().daysInMonth());n.setState({percentage:t})})},n.handleChange=function(t){n.setState({inputHabitTitle:t.target.value})},n.editHabitTitle=function(t){n.state.editingTask?n.setState({editingTask:!1}):n.setState({editingTask:!0})},n.saveHabitTitle=function(t){0!==n.state.inputHabitTitle.length?(n.idHabitFirebaseRef.update({habitTitle:n.state.inputHabitTitle}),n.setState({editingTask:!1,errorInput:!1})):n.setState({errorInput:!0})},n.deleteHabit=function(){n.idHabitFirebaseRef.remove()},n.askToConfirmRemoval=function(){n.setState({showModal:!0})},n.confirm=function(){n.setState({confirmed:!0,showModal:!1}),n.deleteHabit()},n.handleCloseModal=function(){n.setState({showModal:!1})},n.state={daysInMonth:[],inputHabitTitle:n.props.habit.title,editingTask:!1,confirmed:!1,showModal:!1,errorInput:!1,percentage:0,pointsFB:0,currMonthDate:""};var a=n.props.habit.idkey,r=y.auth().currentUser.uid;return n.datesFirebaseRef=y.database().ref("/users/"+r+"/habits/"+a).child("dates"),n.idHabitFirebaseRef=y.database().ref("/users/"+r+"/habits/"+a),n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){this.setCurrentMonthDate()}},{key:"componentDidMount",value:function(){var t=this.getFormatedDaysArray();this.setState({daysInMonth:t}),this.setPercentage()}},{key:"setCurrentMonthDate",value:function(){var t=x()().format("YYYY-MM");this.setState({currMonthDate:t})}},{key:"handleClickOnTask",value:function(t,e){e?this.removeDate(t):this.addDate(t)}},{key:"render",value:function(){var t=this,e=this.props.habit,n=this.state,a=n.daysInMonth,i=n.editingTask,o=n.inputHabitTitle,s=n.errorInput,c=n.showModal,l=n.percentage,u=n.pointsFB;return r.a.createElement(L,{className:"col-md-6 col-sm-12"},r.a.createElement(G,null,!i&&r.a.createElement(X,null,e.title),i&&r.a.createElement("input",{type:"text",className:s?"input-title error":"input-title",ref:function(t){return t&&t.focus()},value:o,onChange:this.handleChange,onKeyPress:function(e){"Enter"===e.key&&t.saveHabitTitle()}}),r.a.createElement(q,null,i?r.a.createElement(I.a,{variant:"light mr-2",size:"sm",onClick:this.saveHabitTitle,title:"zapisz tytu\u0142"},r.a.createElement("i",{className:"fas fa-check"})):r.a.createElement(I.a,{variant:"light mr-2",size:"sm",onClick:this.editHabitTitle,title:"edytuj tytu\u0142"},r.a.createElement("i",{className:"fas fa-edit"})),r.a.createElement(I.a,{variant:"light",size:"sm",onClick:this.askToConfirmRemoval,title:"usu\u0144 nawyk"},r.a.createElement("i",{className:"far fa-trash-alt"}))),r.a.createElement(R,{showmodal:c,handleConfirm:this.confirm,handleHide:this.handleHide,handleCloseModal:this.handleCloseModal})),r.a.createElement(T.a,null,r.a.createElement(S.a,{md:7,sm:12},r.a.createElement($,null,a.map(function(e,n){var a=t.checkIfActive(e),i=a?"task taskDone":"task";return r.a.createElement(Q,{key:e,className:i,"data-date":e,onClick:function(){return t.handleClickOnTask(e,a)}},n+1)}))),r.a.createElement(J,{md:5,sm:12},r.a.createElement("p",{className:"mb-0"},"Post\u0119p:"),r.a.createElement(P,{percentage:l}),r.a.createElement("p",null,u,"/",a.length))))}}]),e}(a.Component),tt=n(622),et=n(627),nt=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement(tt.a,{className:"mb-3"},r.a.createElement(et.a,{ref:"taskInput",placeholder:"wpisz nazw\u0119...","aria-label":"nazwa",onChange:this.props.handleChange,style:{boxShadow:"none"},className:this.props.error?"error":"",value:this.props.inputHabit,onKeyPress:function(e){"Enter"===e.key&&t.props.handleClick()}}),r.a.createElement(tt.a.Append,null,r.a.createElement(I.a,{variant:"info",onClick:this.props.handleClick},"dodaj nowy nawyk")))}}]),e}(r.a.Component),at=n(626),rt=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(l.a)(this,Object(u.a)(e).call(this,t))).state={show:n.props.showToast},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return r.a.createElement(at.a,{onClose:this.props.handleCloseToast,style:{zIndex:"1",position:"fixed",bottom:"20px",left:"20px",border:"none"},show:this.props.showToast,autohide:!0},r.a.createElement(at.a.Header,{style:{background:"#28a745",color:"white"}},r.a.createElement("strong",{className:"mr-auto"},"Stworzono nowy nawyk")))}}]),e}(r.a.Component);a.Component;function it(){var t=Object(j.a)(["\nwidth: 100%;\npadding: 20px 0;\nmargin: 20px 0 0 0 !important\njustify-content: space-between;\n@media screen and (max-width: 769px){\n    justify-content: center\n    .col-md-6 {\n        padding: 0 !important;\n    }\n}\nh2 {\n    text-transform: capitalize;\n}\n"]);return it=function(){return t},t}function ot(){var t=Object(j.a)(["\n    max-width: 900px !important\n    display: flex;\n    justify-content: space-between;\n    padding: 5px;\n"]);return ot=function(){return t},t}var st=Object(O.a)(E.a)(ot()),ct=Object(O.a)(T.a)(it());function lt(){var t=Object(j.a)(["\ndisplay: block;\ntext-align: left;\ncolor: red;\nposition: absolute;\nbottom: 0;\n"]);return lt=function(){return t},t}function ut(){var t=Object(j.a)(["\n.error {\n     border-color: red\n }\n"]);return ut=function(){return t},t}function ht(){var t=Object(j.a)(["\nmax-width: 900px !important;\ndisplay: flex;\nflex-wrap: wrap;\njustify-content: space-between;\n"]);return ht=function(){return t},t}var dt=Object(O.a)(E.a)(ht()),pt=(Object(O.a)(S.a)(ut()),O.a.small(lt())),mt=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(l.a)(this,Object(u.a)(e).call(this,t))).handleChangeOnInput=function(t){var e=t.target.value;n.setState({inputNewHabit:e,error:!1})},n.addNewHabit=function(t){var e=y.auth().currentUser.uid;0!==n.state.inputNewHabit.length?(y.database().ref("/users/"+e+"/habits").push({habitTitle:n.state.inputNewHabit,habitPoints:0,dates:{}}).then(function(){console.log(n.state.showToast),n.setState({showToast:!0})}),n.setState({error:!1,inputNewHabit:""})):n.setState({error:!0})},n.handleCloseToast=function(){n.setState({showToast:!1})},n.state={inputNewHabit:"",error:!1,currentMonthTitle:"",showToast:!1,currentDate:""},n.timeout=null,n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.setCurrentMonth()}},{key:"componentDidUpdate",value:function(){}},{key:"setCurrentMonth",value:function(t){if(t){var e=x()(t).format("MMMM");this.setState({currentMonthTitle:e})}else{var n=x()().format("MMMM");this.setState({currentMonthTitle:n})}}},{key:"render",value:function(){var t=this.state,e=t.error,n=t.currentMonthTitle,a=t.inputNewHabit,i=t.showToast;return r.a.createElement(r.a.Fragment,null,r.a.createElement(st,null,r.a.createElement(ct,null,r.a.createElement(rt,{showToast:i,handleCloseToast:this.handleCloseToast}),r.a.createElement("h2",null," ",n," "),r.a.createElement(S.a,{md:6,style:{padding:"0 0 0 10px"}},r.a.createElement(nt,{error:e,handleChange:this.handleChangeOnInput,handleClick:this.addNewHabit,inputHabit:a}),e&&r.a.createElement(pt,null,"* pole jest wymagane ")))),r.a.createElement(dt,null,null!==this.props.habits&&0!==this.props.habits.length?this.props.habits.map(function(t){return r.a.createElement(Z,{habit:t,key:t.idkey})}):r.a.createElement("h5",null,"Nie utworzono jeszcze \u017cadnych nawyk\xf3w")))}}]),e}(a.Component),ft=n(625),bt=n(624),vt=n(53),gt=n.n(vt),yt=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement(ft.a,{style:{backgroundColor:"#373f51"},variant:"dark"},r.a.createElement(st,null,r.a.createElement(ft.a.Brand,{href:"/habit-tracker-v1/"},"Habit tracker"),r.a.createElement(bt.a,null,r.a.createElement(f.b,{className:"nav-link",to:"/"},"Nawyki"),r.a.createElement(f.b,{className:"nav-link",to:"/stats"},"Statystyki")),r.a.createElement(bt.a,{className:"ml-auto"},r.a.createElement("span",{style:{color:"white",fontWeight:"bold",padding:"0.5rem 1rem"}},r.a.createElement("i",{className:"far fa-user mr-2"}),gt.a.auth().currentUser.displayName),r.a.createElement(I.a,{variant:"link",className:"nav-link",onClick:function(){return gt.a.auth().signOut()}},"Wyloguj"))))}}]),e}(a.Component),kt=n(628),xt=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(l.a)(this,Object(u.a)(e).call(this,t))).changeIntoPercentage=function(t,e){return Math.ceil(100*t/e)},n.setPoints=function(){var t=y.auth().currentUser.uid,e=x()().daysInMonth();y.database().ref("/users/"+t+"/habits/"+n.props.habit.idkey).child("dates").orderByChild("pushDate").startAt(n.props.currentMonthDate).once("value",function(t){var a=t.val(),r=[];for(var i in a)r.push(i);var o=r.length;n.setState({points:o,total:e})}).then(function(){var t=n.changeIntoPercentage(n.state.points,n.state.total);n.setState({now:t})})},n.state={points:0,total:0,now:0},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){this.setPoints()}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{style:{textAlign:"left"}},this.props.habit.title),r.a.createElement(kt.a,{variant:"success",now:this.state.now,label:"".concat(this.state.now,"%"),style:{marginBottom:"20px",color:"#000"}}))}}]),e}(r.a.Component);function wt(){var t=Object(j.a)(["\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    padding: 20px;\n    max-width: 900px;\n    border: 1px solid #ddd;\n    background: #fff;\n    border-radius: 5px;\n    user-select: none;\n    box-shadow: 0px 2px 3px rgba(0,0,0,.03), 1px 2px 2px rgba(0,0,0,.03), -1px -2px 2px rgba(0,0,0,.03);\n    margin-top: 23px;\n"]);return wt=function(){return t},t}var jt=O.a.div(wt()),Ot=function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement(st,{style:{flexDirection:"column"}},r.a.createElement(ct,null,r.a.createElement("h2",{className:"text-left"},"Statystyki  - ",this.props.currentMonthDate)),this.props.habits&&0!==this.props.habits.length?r.a.createElement(jt,null,this.props.habits.map(function(e){return r.a.createElement(xt,{habit:e,key:e.idkey,currentMonthDate:t.props.currentMonthDate})})):r.a.createElement("p",null,"Brak nawyk\xf3w"))}}]),e}(a.Component),Et=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(l.a)(this,Object(u.a)(e).call(this,t))).state={loading:!0,currentMonthDate:""},n.timeout=null,n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){this.setCurrentMonthDateFromMoment()}},{key:"componentDidMount",value:function(){this.setHabits()}},{key:"componentDidUpdate",value:function(t,e){}},{key:"setCurrentMonthDateFromMoment",value:function(){var t=Object(m.a)(p.a.mark(function t(){var e;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e=x()().format("YYYY-MM"),t.next=3,this.setState({currentMonthDate:e});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"setHabits",value:function(){var t=this,e=y.auth().currentUser.uid;e&&y.database().ref("/users/"+e+"/habits").on("value",function(e){var n=[],a=e.val();for(var r in a)n.push({idkey:r,title:a[r].habitTitle,dates:a[r].dates});t.setState({habits:n,loading:!1})})}},{key:"render",value:function(){var t=this.state,e=t.loading,n=t.habits,a=t.currentMonthDate;return r.a.createElement(r.a.Fragment,null,e&&r.a.createElement(D,null),!e&&r.a.createElement(f.a,null,r.a.createElement(yt,{user:this.props.user}),r.a.createElement(b.a,{path:"/",exact:!0,render:function(){return r.a.createElement(mt,{habits:n,currentMonthDate:a})}}),r.a.createElement(b.a,{path:"/stats",render:function(){return r.a.createElement(Ot,{habits:n,currentMonthDate:a})}})))}}]),e}(a.Component),Ct=n(283),Mt=n.n(Ct),Dt=n(284),St=n.n(Dt),It=function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(l.a)(this,Object(u.a)(e).call(this,t))).writeUserData=function(t){n.setState({user:t}),gt.a.database().ref("users/"+t.uid).set({username:t.displayName,email:t.email})},n.state={user:null,isSignedIn:!1,loading:!0},n.uiConfig={credentialHelper:St.a.auth.CredentialHelper.NONE,signInFlow:"popup",signInOptions:[gt.a.auth.EmailAuthProvider.PROVIDER_ID,gt.a.auth.GoogleAuthProvider.PROVIDER_ID,gt.a.auth.FacebookAuthProvider.PROVIDER_ID],callbacks:{signInSuccessWithAuthResult:function(t){return n.writeUserData(),!1}}},n}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){var t=this;this.unregisterAuthObserver=gt.a.auth().onAuthStateChanged(function(e){e?(t.setState({isSignedIn:!!e}),t.setState({loading:!1})):(t.setState({isSignedIn:!1}),t.setState({loading:!1}))})}},{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){this.unregisterAuthObserver()}},{key:"render",value:function(){var t=this.state.loading;return this.state.isSignedIn?r.a.createElement("div",{className:"App"},r.a.createElement("main",null,r.a.createElement(Et,null))):r.a.createElement(r.a.Fragment,null,t?r.a.createElement(D,null):r.a.createElement("div",{className:"firebase-wrap"},r.a.createElement(Mt.a,{uiConfig:this.uiConfig,firebaseAuth:gt.a.auth()})))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(614);o.a.render(r.a.createElement(It,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[287,1,2]]]);
//# sourceMappingURL=main.f774f1bb.chunk.js.map