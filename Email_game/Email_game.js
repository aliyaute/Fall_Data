var storyContent = ﻿{"inkVersion":19,"root":[["^You wake up and go to work.","\n",{"->":"desk"},["done",{"#f":5,"#n":"g-0"}],null],"done",{"desk":[["^You're sitting at your desk. ","ev",{"CNT?":"read_email"},"!","/ev",[{"->":".^.b","c":true},{"b":["^ Your computer beeps at you and you notice you have an email from your boss.",{"->":"desk.0.6"},null]}],"nop","^ ","ev",{"CNT?":"read_email"},"/ev",[{"->":".^.b","c":true},{"b":["^ You should probably go talk to your boss",{"->":"desk.0.12"},null]}],"nop","\n","ev","str","^Ignore it","/str","/ev",{"*":".^.c-0","flg":4},["ev",{"^->":"desk.0.20.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^Check up on Twitter",{"->":"$r","var":true},null]}],["ev",{"^->":"desk.0.21.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-2","flg":18},{"s":["^Read the email",{"->":"$r","var":true},null]}],["ev",{"^->":"desk.0.22.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"CNT?":"read_email"},"/ev",{"*":".^.^.c-3","flg":19},{"s":["^Go visit your boss",{"->":"$r","var":true},null]}],{"c-0":["\n","^You ignored the email.","\n",{"->":"desk"},{"#f":5}],"c-1":["ev",{"^->":"desk.0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.20.s"},[{"#n":"$r2"}],"\n",{"->":"twitter"},{"#f":5}],"c-2":["ev",{"^->":"desk.0.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.21.s"},[{"#n":"$r2"}],"\n",{"->":"read_email"},{"#f":5}],"c-3":["ev",{"^->":"desk.0.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.22.s"},[{"#n":"$r2"}],"\n",{"->":"visit_boss"},{"#f":5}]}],{"#f":1}],"visit_boss":[["^You visit your boss. ","ev",{"CNT?":"twitter"},"!","/ev",[{"->":".^.b","c":true},{"b":["^ She looks happy.",{"->":".^.^.^.6"},null]}],"nop","^ ","ev",{"VAR?":"time_wasted"},2,">","/ev",[{"->":".^.b","c":true},{"b":["^ She looks unhappy.",{"->":".^.^.^.14"},null]}],"nop","\n",["ev",{"^->":"visit_boss.0.16.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":18},{"s":["^\"What's up, boss?\"",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"visit_boss.0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.16.s"},[{"#n":"$r2"}],"\n","^How's that story I assigned you coming?","\n",["ev","str","^Lie","/str","/ev",{"*":".^.c-0","flg":20},"ev","str","^Tell the truth","/str","/ev",{"*":".^.c-1","flg":20},{"c-0":["^ It's going great!","\n","^I know that's a lie.","\n",{"->":".^.^.^.^.you_are_fired"},{"#f":5}],"c-1":["^ I haven't even started on it.","\n","^I know, thanks for being honest.","\n",{"->":".^.^.^.^.you_are_fired"},{"#f":5}]}],{"#f":5}],"you_are_fired":["^You're fired!","\n","done","done",{"#f":5}]}],{"#f":1}],"twitter":[["ev",{"VAR?":"time_wasted"},1,"+","/ev",{"VAR=":"time_wasted","re":true},"^You scroll through Twitter. People are arguing about ",["ev","visit",5,"seq","/ev","ev","du",0,"==","/ev",{"->":".^.s0","c":true},"ev","du",1,"==","/ev",{"->":".^.s1","c":true},"ev","du",2,"==","/ev",{"->":".^.s2","c":true},"ev","du",3,"==","/ev",{"->":".^.s3","c":true},"ev","du",4,"==","/ev",{"->":".^.s4","c":true},"nop",{"s0":["pop","^dogs",{"->":".^.^.35"},null],"s1":["pop","^journalism",{"->":".^.^.35"},null],"s2":["pop","^social issues",{"->":".^.^.35"},null],"s3":["pop","^breakfast",{"->":".^.^.35"},null],"s4":["pop","^brexit",{"->":".^.^.35"},null],"#f":5}],"^.","\n","ev","str","^Keep scrolling","/str","/ev",{"*":".^.c-0","flg":4},"ev","str","^Pay attention to work","/str","/ev",{"*":".^.c-1","flg":4},{"c-0":["\n","^You keep scrolling through Twitter.","\n",{"->":".^.^.^"},{"#f":5}],"c-1":["\n",{"->":"desk"},{"#f":5}]}],{"#f":1}],"read_email":["^The email says: come visit my office immediately!!!!!","\n",{"->":"desk"},{"#f":1}],"global decl":["ev",0,{"VAR=":"time_wasted"},"/ev","end",null],"#f":1}],"listDefs":{}};