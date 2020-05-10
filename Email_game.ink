VAR time_wasted = 0

You wake up and go to work.

-> desk

=== desk ===

You're sitting at your desk. {not read_email: Your computer beeps at you and you notice you have an email from your boss.} {read_email: You should probably go talk to your boss}

+ [Ignore it]
    You ignored the email.
    -> desk
+ Check up on Twitter
    -> twitter
* Read the email
    -> read_email
* {read_email} Go visit your boss
    -> visit_boss
    
=== visit_boss ===

You visit your boss. {not twitter: She looks happy.} {time_wasted > 2: She looks unhappy.}

* "What's up, boss?"
    How's that story I assigned you coming?
    * * [Lie] It's going great!
        I know that's a lie.
    * * [Tell the truth] I haven't even started on it.
        I know, thanks for being honest.

- (you_are_fired)

You're fired!

-> DONE

-> DONE

=== twitter ===

~ time_wasted = time_wasted + 1

You scroll through Twitter. People are arguing about {~dogs|journalism|social issues|breakfast|brexit}.

+ [Keep scrolling]
    You keep scrolling through Twitter.
    -> twitter
+ [Pay attention to work]
    -> desk

=== read_email ===

The email says: come visit my office immediately!!!!!

-> desk