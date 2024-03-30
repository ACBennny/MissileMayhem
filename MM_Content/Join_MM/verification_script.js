/*************************************************************
 * This is the front end request (testing only) for the homepage of Missle Mayhem
 * 
 * @name (Anyanwu_Benedict_Chukwuemeka)
 * @version (v0.01)
 *************************************************************/



        // Verification function
        function verification(destination)
        {
            // Verification Popup modal
            const mainBodyContentTemp = document.querySelector(".main_body .main_body_content");
            const verCodeBdr = document.createElement("div");
            verCodeBdr.classList.add("vercode_bdr");
            verCodeBdr.innerHTML = 
            ` <!-- preloader -->
                    <div class="ver_loader">
                        <span class="vl_1">
                            <span class="vl_2"></span>
                        </span>
                        <p class="vl_note">
                            <span id="loader_ctnt">Processing</span>
                            <span id="vl_note_loader">
                                <i class="fa-solid fa-circle" style="--i:1"></i>
                                <i class="fa-solid fa-circle" style="--i:2"></i>
                                <i class="fa-solid fa-circle" style="--i:3"></i>
                            </span>
                        </p>
                    </div>
                        
                    <!-- close box -->
                    <div class=" gen_Style close_verification_box">
                        <i class="fa-solid fa-xmark"></i>
                    </div>

                    <!-- background -->
                    <div class="vercode_bcg"></div>

                    <!-- content -->
                    <div class="vercode_box">
                        <form  class="email_verForm"  id="email_form">

                            <div class="ask_for_ver">
                                <h4>Verification</h4>
                                <p>
                                    <span id="ver_Newuser_name"></span>
                                    <span id="ver_sub_title">will need to be verified before you can continue</span>
                                </p>
                            </div>

                            <!-- User Details -->
                            <input type="text" name="subject" placeholder="Subject"id="new_email_verSubject" />
                            <textarea name="text" placeholder="Message" id="new_email_verBody"></textarea>
                            <input type="text" name="reply_to" placeholder="Your Email" id="new_email_verBtn"/>

                            <!-- Validation field -->
                            <span class="typeincode">
                                <!-- <h4>An OTP has been sent to your email</h4> -->
                                <span class="input_verCode_num">
                                    <input id="input_verCode" type="text" placeholder="Enter Code here"/>
                                </span>
                                <p>Code expires in <span id="time_countdown">300</span>seconds</p>
                            </span>

                            <!-- set the reply-to address -->
                            <span class="ver_req_box">
                                <input id="submit_form" type="button" value="Get Code" class="" />
                                <input id="submit_verCode" type="button" value="Verify" class="hideBtn" />
                                <input id="request_verCode" type="button" value="Try Again" class="hideBtn" />
                                <p class="ver_sent_warn"></p>
                            </span>
                        
                            <!-- Form Provider - Powered by Postmail -->
                            <p class="form_provider">
                                <span>Powered by</span>
                                <img src="../../blue_Img_Main/postmailIcon.png" alt="Post Mail Icon">
                                <a href="https://postmail.invotes.com" target="_blank">PostMail</a>
                            </p>
                        </form>
                    </div>`;
                    mainBodyContentTemp.appendChild(verCodeBdr);
            const verCodeBox_loader = verCodeBdr.querySelector(".ver_loader");
            const ver_loader_note_ctnt = verCodeBox_loader.querySelector("#loader_ctnt");
            const close_verCodeBdr = verCodeBdr.querySelector(".gen_Style");
            const sendVerCode = verCodeBdr.querySelector(".ver_req_box #submit_form");
            const valVerCode = verCodeBdr.querySelector(".ver_req_box #submit_verCode");
            const reqVerCode = verCodeBdr.querySelector(".ver_req_box #request_verCode");
            const verCodeBox = verCodeBdr.querySelector('.ask_for_ver');
            const verCodeTitle = verCodeBox.querySelector('.ask_for_ver h4');
            const verCodeSubTitle = verCodeBox.querySelector('.ask_for_ver p');
            const verCodeSubTitleNAme = verCodeSubTitle.querySelector('#ver_Newuser_name');
            const verCodeSubTitleCtnt = verCodeSubTitle.querySelector('#ver_sub_title');
            const enterOtp = verCodeBdr.querySelector(".typeincode");
            const enterOtpInput = enterOtp.querySelector("#input_verCode");
            const verCodeTimer = enterOtp.querySelector('p #time_countdown');
            let timer;

            // Preloader
            ver_loader_note_ctnt.draggable = false;

            // if box is closed , it opens
            if(!(verCodeBdr.classList.contains("active")))
            {
                document.body.classList.add('off_Flow');
                document.body.classList.remove('on_Flow');
                verCodeBdr.classList.add("active");
                verCodeBox_loader.classList.add("active");
                verCodeLoader();
                emailVerCode();

            }

            // Closes the verification box
            close_verCodeBdr.addEventListener("click" , (e) => {
                let warn_to_close = confirm(" As per privacy policies, closing the form will reload the current page. \n Any unsaved changes will be lost.");
                if((warn_to_close == false))
                {
                    e.preventDefault();
                }
                else
                {
                    window.location.reload();
                }
            });


            // Removes preloader after "5" seconds
            function verCodeLoader(){
                verCodeBox_loader.classList.add("active");
                if((verCodeBox_loader.classList.contains("active")))
                {
                    setTimeout(() => verCodeBox_loader.classList.remove("active") , 5000);
                }
            }
                
            //  Generating OTP String
                function generateRandomString() {
                    const length = 32
                    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()|\"@#$%&*^&!~`/;:<>[{]}-+=?';
                    var result = '';
                    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
                    return result;
                }

                var secret = generateRandomString(32); // Generate a random secret key
                console.log('Secret key:', secret);

            
            // Generate OTP num
            function generateOTP () {
    
                const len = 8;
                    let otp = '';
                    const digits = '0123456789';
                        for (let i = 0; i < len; i++) {
                            otp += digits[Math.floor(Math.random() * 10)];
                        }
                        return otp;
            }
            
            // Carries the sending of email
            function emailVerCode(){
                // Gets code
                // let thisVercart = generateRandomString();
                let thisVercart = generateOTP();
                console.log(" val => " + thisVercart);
                
                // Stores user input for code
                let enterCodeArray = [];

                // Countdown timer for verification code
                const timePeriod = 300;

                function verTimer() {
                    let sec = timePeriod;
                    timer = setInterval(function(){
                        sec--;

                        // Displays timer in page
                        verCodeTimer.textContent = sec;
                        
                        // Once timer hits "0" , a notification is diplayed and field for vercode is closed. User would need to request a new one
                        if (sec <= 0) {
                            clearInterval(timer);
                            if((checkNameBool == true))
                            {
                                verCodeSubTitleCtnt.textContent = ", your code has expired. You need to request a new one";
                            }
                            else
                            {
                                verCodeSubTitleCtnt.textContent = "Your code has expired. You will need to request a new one";
                            }
                            enterOtp.classList.remove("active");
                            valVerCode.classList.add("hideBtn");
                            reqVerCode.classList.remove("hideBtn");
                            verCodeTimer.textContent = "30";
                        }
                    }, 1000);
                }

                // Email content
                let currVerC = thisVercart;
                console.log("email val => " + currVerC);
                new_email_verBtn.value = destination;
                new_email_verSubject.value = "Account Creation";
                new_email_verBody.value= "This is a OTP request for " + newName.value + ". Your OTP is " + currVerC +" . Please do not share this code with anyone.";

                // Makes send button active
                if((sendVerCode.classList.contains("hideBtn")))
                {
                    sendVerCode.classList.remove("hideBtn");
                    reqVerCode.classList.add("hideBtn");
                }

                // Send Email
                sendVerCode.addEventListener("click" , () => {

                    /* ========= Code by Post Mail =========== starts ===*/
                        // var form_id_js = "email_form";

                        // var data_js = {
                        //     "access_token": "0m8ikok0thqv6rtoucea493n"
                        // };

                        // var sendButton = document.getElementById("submit_form");

                        // function js_send() {
                        //     sendButton.value='Sending…';
                        //     sendButton.disabled=true;
                        //     var request = new XMLHttpRequest();

                        //     var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
                        //     var message = document.querySelector("#" + form_id_js + " [name='text']").value;
                        //     data_js['subject'] = subject;
                        //     data_js['text'] = message;
                        //     var params = toParams(data_js);

                        //     request.open("POST", "https://postmail.invotes.com/send", true);
                        //     request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                        //     request.send(params);

                        //     return false;
                        // }

                        // sendButton.onclick = js_send();

                        // function toParams(data_js) {
                        //     var form_data = [];
                        //     for ( var key in data_js ) {
                        //         form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
                        //     }

                        //     return form_data.join("&");
                        // }

                        // var js_form = document.getElementById(form_id_js);
                        // js_form.addEventListener("submit", function (e) {
                        //     e.preventDefault();
                        // });
                    /* ========= Code by Post Mail =========== ends ==*/
                    /* ===== ==> Visit https://postmail.invotes.com <== testing only! === */
                    
                    // Removes an submit button and Replaces with validation button
                    sendVerCode.classList.add("hideBtn");
                    valVerCode.classList.remove("hideBtn");

                    // Changes sub-title to "An OTP has been sent to your email";
                    verCodeBox_loader.classList.add("active") 
                    if((verCodeBox_loader.classList.contains("active")))
                    {
                        let loadtimeVerSuccess = 10;
                        let sec = loadtimeVerSuccess;
                        let verSuccesstimer = setInterval(
                            function ()
                            {
                                sec--;
                                if(sec == 9)
                                {
                                    ver_loader_note_ctnt.textContent = "Generating code";
                                }
                                if(sec == 4)
                                {
                                    ver_loader_note_ctnt.textContent = "Sending Code";
                                }
                                if(sec == 1)
                                {
                                    ver_loader_note_ctnt.textContent = "Success";
                                }
                                if(sec == 0)
                                {
                                    clearInterval(verSuccesstimer);
                                    verCodeBox_loader.classList.remove("active");
                                    verCodeTitle.textContent = "Verification";
                                    if((checkNameBool == true))
                                    {
                                        verCodeSubTitleNAme.textContent = newName.value;
                                        verCodeSubTitleCtnt.textContent = ", an OTP has been sent to your email";
                                    }
                                    else
                                    {
                                        verCodeSubTitleNAme.textContent = "";
                                        verCodeSubTitleCtnt.textContent = "An OTP has been sent to your email";
                                    }
                                    // Starts timer
                                    verTimer();
                                }
                            }
                        , 1000);

                        // Activates Input field for Code
                        enterOtp.classList.add("active");
                    }
                });

                
                // VALIDATING CODE
                    // Array to store wrong values
                    const invalidVerArray = [];

                    // Conditon for input - Allows only numbers
                    const enterOtp_Condition = new RegExp("^[a-zA-Z0-9]*$");
                    enterOtpInput.ariaAutoComplete = "none";
                    enterOtpInput.autoComplete = "off";
                    enterOtpInput.autoCapitalize = "off";
                    enterOtpInput.autoCorrect = "off";
                    enterOtpInput.spellCheck = false;
                    enterOtpInput.ariaHasPopup = false;

                    enterOtpInput.addEventListener("beforeinput", (event) => {
                        if (event.data != null && !(enterOtp_Condition.test(event.data))) 
                            event.preventDefault();
                    });

                    // Stores user input in an array
                    enterOtpInput.addEventListener("input" , () => {
                        // enterCodeArray.push(input_verCode.value);
                        enterCodeArray.push(enterOtpInput.value);
                        let lastEnterCodeArrayVal = enterCodeArray.at(-1);
                        console.log("ver code inputs => " + enterCodeArray);
                        console.log("last entered value => " + lastEnterCodeArrayVal);
                    });

                    // Click to Validate
                    valVerCode.addEventListener("click" , () => {
                        // Gets last value in array
                        let lastEnterCodeArrayVal = enterCodeArray.at(-1);
                        // Assigns last value to avraible
                        let currValue = lastEnterCodeArrayVal;
                        // Makes preloader active
                        verCodeBox_loader.classList.add("active");
                        // Changes text Note on preloader to "verifying"
                        ver_loader_note_ctnt.textContent = "Verifying";

                        // Compares value inputed after 2.5 seconds
                        setTimeout(()=> 
                        {
                            // If user's inputeed is correct, this occurs
                            if(currValue == thisVercart)
                            {
                                // Clears timer
                                clearInterval(timer);

                                // Sequence of messages displayed at differnet points ove a second period before is redirected to homepage
                                setTimeout(
                                    function()
                                    {
                                        let loadtimeVerSuccess = 20;
                                        let seconds = loadtimeVerSuccess;
                                        let verSuccesstimer = setInterval(
                                            function (){
                                                seconds--;
                                                if(seconds == 19)
                                                {
                                                    ver_loader_note_ctnt.textContent = "Verified";
                                                }
                                                if(seconds == 17)
                                                {
                                                    ver_loader_note_ctnt.textContent = "Creating Account";
                                                }
                                                if(seconds == 7)
                                                {
                                                    ver_loader_note_ctnt.textContent = "Account Created";
                                                }
                                                if(seconds == 5)
                                                {
                                                    ver_loader_note_ctnt.textContent = "Redirecting";
                                                }
                                                if(seconds == 0)
                                                {
                                                    clearInterval(verSuccesstimer);
                                                    join_body.removeChild(join_body_main);
                                                    preloader.style.display = "flex";
                                                    setTimeout(() => window.location.pathname = "../../blue_home/Home.html" , 3000);
                                                }
                                            }
                                        , 1000);
                                    }
                                ,2500);
                            }
                            // If User makes more than three (3) wrong attempts this occurs
                            else if(invalidVerArray.length > 2)
                            {
                                // Clears timer
                                clearInterval(timer);
                                // Makes preloader text note to ""
                                ver_loader_note_ctnt.textContent = "";
                                // Checks if user's name is less than 30
                                if((checkNameBool == true))
                                {
                                    // If it is <30 the subtitle ctnt is changed to this
                                    verCodeSubTitleCtnt.textContent = ", you have made too many incorrect attempts";
                                }
                                else
                                {
                                    // If it is not , the subtitle ctnt is changed to this
                                    verCodeSubTitleCtnt.textContent = "You have made too many incorrect attempts";
                                }
                                // The input field for user ver code is hidden
                                enterOtp.classList.remove("active");
                                // The try again button is made active
                                valVerCode.classList.add("hideBtn");
                                // The verify button is hidden
                                reqVerCode.classList.remove("hideBtn");
                                // Showing this in console for test purposes
                                // console.log("too many tries");
                                // Removes preloader after 2.5seconds
                                setTimeout(() => verCodeBox_loader.classList.remove("active") , 2500);
                            }
                            // If user's input is incorrect, this occurs
                            else
                            {
                                // Sets preloader text note to "invalid code"
                                ver_loader_note_ctnt.textContent = "Invalid Code";
                                // Adds the user input into the invalid array
                                invalidVerArray.push(enterOtpInput.value);
                                // Shows result for testing
                                console.log("Invalid codes : " + invalidVerArray);
                                // Removes preloader after 2.5seconds
                                setTimeout(() => verCodeBox_loader.classList.remove("active") , 2500);
                            }
                        },2500);
                    });
            }

            // Requesting new code
                reqVerCode.addEventListener("click" , emailVerCode);
            
        }