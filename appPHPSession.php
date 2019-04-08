<?php
/*	App - PHP Session variable Editors
 *	Function: Finds, returns and edits PHP session variables.
 *	Version: 190307
 *  Note: Preceeds appSessions.php
 * 	php, js
*/

session_start();
/**/
if ( isset($_POST) ) {
  if ( isset($_POST['response']) && $_POST['response'] == "destroy" ) {
    session_unset();
    session_destroy();

  } else if ( isset($_POST['update']) ) {
    session_unset();
    $i = 0;
    foreach ($_POST as $key => $value) {

      if ( !empty($value) ) {
        $expl = explode("-", $key);
        $refe = array_shift($expl);
        if ( $refe == "var" ) {
          $i++;

          if ( !empty($_POST['val-'.$i]) ) {
            if ( gettype($_POST['val-'.$i]) == "string" ) {

              /// if boolean
              if ( $_POST['val-'. $i] == 'true' ) {
                $_SESSION[$_POST['var-'. $i]] = true;
              } else if ( $_POST['val-'. $i] == 'false' ) {
                $_SESSION[$_POST['var-'. $i]] = false;

              /// if string
              } else {
                $_SESSION[$_POST['var-'. $i]] = $_POST['val-' . $i];
              }

            /// if number
            } else if ( gettype($_POST['val-'.$i]) == "number" ) {
              $_SESSION[$_POST['var-'. $i]] = (int)$_POST['val-' . $i];

            /// if array
            } else if ( gettype($_POST['val-'.$i]) == "array" ) {
              $arr = [];
                foreach ( $_POST['val-'.$i] as $arrVar => $arrVal ) {
                  if ( !empty($_POST['var-'.$i.'-'][$arrVar]) ) {
                    $arr[$_POST['var-'.$i.'-'][$arrVar]] = $_POST['val-'.$i][$arrVar];
                  }
                }
              $_SESSION[$_POST['var-'. $i]] = $arr;
            }
          }
        }
      }
    }
  }
}

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
    <title>PHP Session Editor</title>
    <link href="https://www.favicon.cc/logo3d/872682.png" rel="icon"/>
    <style type="text/less">
      @import "https://fonts.googleapis.com/css?family=Roboto:300,400";

      .fluid(@max-value, @min-value, @max-vw, @min-vw) {
      	@max-value-unit: unit(@max-value, px);
      	@min-value-unit: unit(@min-value, px);
      	@min-vw-unit: unit(@min-vw, px);
      	@property: ~'calc(@{min-value-unit} + (@{max-value} - @{min-value}) * ((100vw - @{min-vw-unit})/(@{max-vw} - @{min-vw})))';
      }

      @lightgreen: #80FF9E;
      @lilac: #5955CC;

      * {
        margin: 0;
        padding: 0;
        line-height: 1;
        box-sizing: border-box;
        font-family: "Roboto", "Helvetica", sans-serif;
      }

      body {
        width: 100%;
        height: 100vh;
        background: linear-gradient(#2568DB, #C886EE);
      }

      .notiz {
        width: 100%;
        text-align: center;
        font-size: 22px;
        color: white;
      }

      header {
        padding: 17px 20px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;

        div {
          display: flex;
        }

        p {
          color: white;
          margin-right: 20px;
          text-transform: capitalize;

          &.set {
            color: @lightgreen;
          }
          &.empty {
            color: #A9BDC1;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }

      main {
        width: 100%;
        max-height: 80vh;
        overflow: auto;
      }
      ::-webkit-scrollbar {
          width: 5px;
      }

      ::-webkit-scrollbar-track {
          background: fadeout(black, 90%);
      }

      ::-webkit-scrollbar-thumb {
          background: fadeout(white, 60%);
      }

      ::-webkit-scrollbar-thumb:hover {
          background: fadeout(white, 50%);
      }

      .center {
        max-width: 595px;
        width: 100%;
        margin: 0 auto;
        padding: 0 20px;
      }

      h1 {
        font-weight: 300;
        font-size: 42px;
        text-align: center;
        color: white;
        margin: 15px 0 40px;
      }

      form {
        width: 100%;

        button {
          opacity: 0;
          pointer-events: none;
          display: none;
        }
      }

      .var-wrapper {
        width: calc(100% + 20px);
        display: flex;
        margin-bottom: 20px;
        position: relative;
      }

      .input {
        width: 100%;
        height: 36px;
        display: flex;
        border-radius: 10px;
        align-items: center;
        padding: 0px 15px;
        font-size: 16px;
        font-weight: 400;
        color: @lilac;
        background-color: fadeout(white, 32%);
        box-shadow: 0 0 16px fadeout(black, 84%);
        margin-right: 20px;
        -webkit-appearance: none;
        appearance: none;
        border: none;
      }

      .var {
        width: calc((160 / 575) * 100%);
        text-align: center;
        text-align-last: center;
        margin-right: 20px;
      }

      .val {
        width: calc((330 / 575) * 100%);
        margin-right: 10px;
      }

      .del {
        width: 36px;
        height: 36px;
        position: relative;
        margin-right: 0;

        span {
          width: 14px;
          height: 1px;
          position: absolute;
          background-color: @lilac;
          top: 50%;
          left: 50%;

          &:first-child {
            transform: translate(-50%, -50%) rotate(45deg);
          }

          &:last-child {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }

      .array {
        .val {
          > div {
            width: calc(100% + 10px);
            display: flex;
            position: relative;
            margin-bottom: 10px;

            .del {
              position: absolute;
              right: 0px;
              transform: translateX(100%);
            }

            &:last-child {
              margin-bottom: 0;
            }

          }
        }

        .input {
          margin-right: 10px;

          &.key, &.add {
            width: calc((100 / 330) * 100%);
            text-align: center;
            text-align-last: center;
          }

          &.add {
            p {
              width: 100%;
              text-align: inherit;
            }
          }

          &.del {
            margin-right: 0;
          }

          &.value {
            width: calc((220 / 330) * 100%);
          }
        }
      }

      .boolean {
        .val {
          display: flex;


          div {
            width: calc((160 / 330) * 100%);
            margin-right: 10px;
            position: relative;

            &:last-child {
              margin-right: 0;
            }

            p {
              position: absolute;
              pointer-events: none;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .input {
              color: @lilac;

              &:not(:checked) {
                background-color: transparent;
                border: 1px solid white;

                & ~ p {
                  color: white;
                }
              }
            }

          }
        }
      }

      footer {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        padding-bottom: 20px !important;
        display: flex;
        justify-content: space-between;

        div {
          display: flex;
        }

        .input {
          width: 90px;
          height: 90px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          &:last-child {
            margin-right: 0;
          }

          svg {
            width: 35px;
            height: 35px;
            margin-bottom: 15px;
          }

          p {
            width: 100%;
            position: absolute;
            bottom: 10px;
            text-align: center;
            font-size: 16px;
            color: @lilac;
          }
        }
      }

      @media (max-width: 599px) {

        header {
          p {
            margin-right: calc(12px + ((20 - 12) * (100vw - 360px) / (599 - 360)));
          }
        }

        h1 {
          font-size: calc(26px + ((42 - 26) * (100vw - 360px) / (599 - 360)));
          margin-bottom: calc(26px + ((40 - 25) * (100vw - 360px) / (599 - 360)));
        }

        form {
          max-width: 100%;
        }

        .input {
          height: calc(32px + ((36 - 32) * (100vw - 360px) / (599 - 360)));
          font-size: calc(14px + ((16 - 14) * (100vw - 360px) / (599 - 360)));
          border-radius: calc(6px + ((10 - 6) * (100vw - 360px) / (599 - 360)));
        }

        .del {
          width: calc(32px + ((36 - 32) * (100vw - 360px) / (599 - 360)));
        }

        .var-wrapper {
          width: calc(100% + (0px + ((20 - 0) * (100vw - 360px) / (599 - 360))))
        }

        .var {
          margin-right: calc(10px + ((20 - 10) * (100vw - 360px) / (599 - 360)));
        }


        footer {
          .input {
            width: calc(52px + ((90 - 52) * (100vw - 360px) / (599 - 360)));
            height: calc(52px + ((90 - 52) * (100vw - 360px) / (599 - 360)));
            margin-right: calc(11px + ((20 - 11) * (100vw - 360px) / (599 - 360)));

            p {
              font-size: calc(10px + ((16 - 10) * (100vw - 360px) / (599 - 360)));
              bottom: calc(6px + ((10 - 6) * (100vw - 360px) / (599 - 360)));
            }

            svg {
              width: calc(20px + ((35 - 20) * (100vw - 360px) / (599 - 360)));
              height: calc(20px + ((35 - 20) * (100vw - 360px) / (599 - 360)));
              margin-bottom: calc(13px + ((10 - 13) * (100vw - 360px) / (599 - 360)));
            }
          }
        }

      }

    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
  </head>
  <body>
    <header>
      <div>
        <p>Status</p>
        <?php $status = empty($_SESSION) ? "empty" : "set"; ?>
        <p class="<?php echo $status; ?>"><?php echo $status; ?></p>
        <p>Host</p>
        <p class="set"><?php echo $_SERVER['SERVER_NAME']; ?></p>
      </div>
      <div>
        <p>v190223 © Ian Yong</p>
      </div>
    </header>
    <main>
      <div class="center">
        <h1>PHP Session</h1>
        <noscript class="notiz">Enable JavaScript to run this.</noscript>
        <form method="post">
          <?php $n = 0;
          if ( !empty($_SESSION) ) {
            foreach ($_SESSION as $var => $val) {
              $n++;
              switch (gettype($val)) {
                case "string":
                case "integer":
                  echo '<div class="var-wrapper string">
                    <div class="var">
                      <input type="text" placeholder="Variable Name" class="input" name="var-'.$n.'" value="'.$var.'">
                    </div>
                    <div class="val">
                      <input type="text" placeholder="String Value" class="input" name="val-'.$n.'" value="'.$val.'">
                    </div>
                    <div class="del input">
                      <span></span>
                      <span></span>
                    </div>
                  </div>';
                  break;

                case "boolean":
                  if ( $val ) {
                    $true = '<input type="radio" value="true" class="input" name="val-'.$n.'" checked>';
                    $false = '<input type="radio" value="false" class="input" name="val-'.$n.'">';
                  } else {
                    $true = '<input type="radio" value="true" class="input" name="val-'.$n.'">';
                    $false = '<input type="radio" value="false" class="input" name="val-'.$n.'" checked>';
                  }

                  echo '<div class="var-wrapper boolean">
                    <div class="var">
                      <input type="text" placeholder="Variable Name" class="input" name="var-'.$n.'" value="'.$var.'"/>
                    </div>
                    <div class="val">
                      <div>
                        '.$true.'
                        <p>True</p>
                      </div>
                      <div>
                        '.$false.'
                        <p>False</p>
                      </div>
                    </div>
                    <div type="button" class="del input">
                      <span></span>
                      <span></span>
                    </div>
                  </div>';
                  break;

                case "array":
                  $m = 0;
                  $arrayVal = "";
                  foreach ( $val as $arrayKey => $arrayValue ) {
                    $m++;
                    $arrayVal .= '<div>
                      <input type="text" placeholder="Key" class="input key" name="var-'.$n.'-['.$m.']" value="'.$arrayKey.'">
                      <input type="text" placeholder="Value" class="input value" name="val-'.$n.'['.$m.']"  value="'.$arrayValue.'">
                      <div type="button" class="del input">
                        <span></span>
                        <span></span>
                      </div>
                    </div>';
                  }
                  echo '<div class="var-wrapper array">
                    <div class="var">
                      <input type="text" placeholder="Variable Name" class="input" name="var-'.$n.'" value="'.$var.'"/>
                    </div>
                    <div class="val">
                      <div>
                        <div type="button" class="input add">
                          <p>Add</p>
                        </div>
                      </div>
                      '.$arrayVal.'
                    </div>
                    <div type="button" class="del input">
                      <span></span>
                      <span></span>
                    </div>
                  </div>';
                  break;
              }
            }
          }  ?>
          <?php /* <div class="var-wrapper string">
            <div class="var">
              <input type="text" placeholder="Variable Name" class="input">
            </div>
            <div class="val">
              <input type="text" placeholder="String Value" class="input">
            </div>
            <button type="button" class="del input">
              <span></span>
              <span></span>
            </button>
          </div>

          <div class="var-wrapper array">
            <div class="var">
              <input type="text" placeholder="Variable Name" class="input">
            </div>
            <div class="val">
              <div>
                <button type="button" class="input add">
                  <p>Add</p>
                </button>
              </div>
              <div>
                <input type="text" placeholder="Key" class="input key">
                <input type="text" placeholder="Value" class="input value">
                <button type="button" class="del input">
                  <span></span>
                  <span></span>
                </button>
              </div>
              <div>
                <input type="text" placeholder="Key" class="input key">
                <input type="text" placeholder="Value" class="input value">
                <button type="button" class="del input">
                  <span></span>
                  <span></span>
                </button>
              </div>
              <div>
                <input type="text" placeholder="Key" class="input key">
                <input type="text" placeholder="Value" class="input value">
                <button type="button" class="del input">
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
            <button type="button" class="del input">
              <span></span>
              <span></span>
            </button>
          </div>

          <div class="var-wrapper boolean">
            <div class="var">
              <input type="text" placeholder="Variable Name" class="input">
            </div>
            <div class="val">
              <div>
                <input type="radio" name="hi" value="true" class="input">
                <p>True</p>
              </div>
              <div>
                <input type="radio" name="hi" value="false" class="input">
                <p>False</p>
              </div>
            </div>
            <button type="button" class="del input">
              <span></span>
              <span></span>
            </button>
          </div> */ ?>
          <input type="hidden" name="update" value="update"/>
          <button type="submit" name="update"></button>
        </form>
      </div>
    </main>

    <footer class="center">
      <div>
        <button type="button" class="input" value="string">
          <svg xmlns="http://www.w3.org/2000/svg" width="19.905" height="25.112" viewBox="0 0 19.905 25.112"><g transform="translate(-593.881 -296.43)"><path d="M593.881,296.43h19.905v6.4h-1.8a17.685,17.685,0,0,0-.8-2.5,4.958,4.958,0,0,0-.837-1.4,2.633,2.633,0,0,0-.948-.681,4.332,4.332,0,0,0-1.517-.2h-2.337v18.838a9.864,9.864,0,0,0,.12,1.73,2.807,2.807,0,0,0,.368,1.021,1.693,1.693,0,0,0,.672.588,6.187,6.187,0,0,0,1.324.414v.9h-8.407v-.9a9.847,9.847,0,0,0,.975-.276,2.347,2.347,0,0,0,.69-.359,1.684,1.684,0,0,0,.441-.542,3.125,3.125,0,0,0,.276-.9,10.368,10.368,0,0,0,.1-1.674V298.049h-2.317a5.113,5.113,0,0,0-1.426.166,2.286,2.286,0,0,0-1.04.69,5.046,5.046,0,0,0-.874,1.49,16.782,16.782,0,0,0-.744,2.437h-1.822Z" fill="#5955cc"/></g></svg>
          <p>String</p>
        </button>
        <button type="button" class="input" value="array">
          <svg xmlns="http://www.w3.org/2000/svg" width="35.334" height="28.625" viewBox="0 0 35.334 28.625"><path d="M533.167,310.667h5.776a4.5,4.5,0,1,0,0-3h-5.776a2,2,0,0,1-2-2v-4.75h7.776a4.5,4.5,0,1,0,0-3H521.057a4.5,4.5,0,1,0,0,3h7.11v14.625a5.006,5.006,0,0,0,5,5h5.776a4.5,4.5,0,1,0,0-3h-5.776a2,2,0,0,1-2-2v-5.3A4.964,4.964,0,0,0,533.167,310.667Zm10-4a2.5,2.5,0,1,1-2.5,2.5A2.5,2.5,0,0,1,543.167,306.667Zm0-9.75a2.5,2.5,0,1,1-2.5,2.5A2.5,2.5,0,0,1,543.167,296.917Zm-26.334,5a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,516.833,301.917Zm26.334,14.625a2.5,2.5,0,1,1-2.5,2.5A2.5,2.5,0,0,1,543.167,316.542Z" transform="translate(-512.333 -294.917)" fill="#5955cc"/></svg>
          <p>Array</p>
        </button>
        <button type="button" class="input" value="boolean">
          <svg xmlns="http://www.w3.org/2000/svg" width="37.713" height="25.123" viewBox="0 0 37.713 25.123"><path d="M670.727,307.076h-8.517a12.562,12.562,0,1,0,0,10.453h8.517a5.226,5.226,0,1,0,0-10.453ZM650.8,322.528A10.225,10.225,0,1,1,661.027,312.3,10.236,10.236,0,0,1,650.8,322.528Z" transform="translate(-638.241 -299.742)" fill="#5955cc"/></svg>
          <p>Boolean</p>
        </button>
      </div>
      <div>
        <button type="button" class="input" value="destroy">
          <svg xmlns="http://www.w3.org/2000/svg" width="26.975" height="33.167" viewBox="0 0 26.975 33.167"><path d="M716.454,298.374v-2.513A4.958,4.958,0,0,0,711.5,290.9h-6.967a4.959,4.959,0,0,0-4.958,4.959v2.513h-5.046v3h2.78v18.57a4.125,4.125,0,0,0,4.125,4.125h13.165a4.125,4.125,0,0,0,4.125-4.125v-18.57h2.78v-3Zm-13.883-2.513a1.959,1.959,0,0,1,1.958-1.959H711.5a1.959,1.959,0,0,1,1.958,1.959v2.513H702.571Zm.218,22.875h-.435a1.282,1.282,0,0,1-1.283-1.283v-8.476a1.283,1.283,0,0,1,1.283-1.283h.435a1.283,1.283,0,0,1,1.282,1.283v8.476A1.282,1.282,0,0,1,702.789,318.736Zm5.441,0h-.435a1.282,1.282,0,0,1-1.282-1.283v-8.476a1.283,1.283,0,0,1,1.282-1.283h.435a1.283,1.283,0,0,1,1.283,1.283v8.476A1.282,1.282,0,0,1,708.23,318.736Zm5.442,0h-.435a1.282,1.282,0,0,1-1.283-1.283v-8.476a1.283,1.283,0,0,1,1.283-1.283h.435a1.283,1.283,0,0,1,1.282,1.283v8.476A1.282,1.282,0,0,1,713.672,318.736Z" transform="translate(-694.525 -290.902)" fill="#5955cc"/></svg>
          <p>Destroy</p>
        </button>
        <button type="button" class="input" value="update">
          <svg xmlns="http://www.w3.org/2000/svg" width="24.348" height="35" viewBox="0 0 24.348 35"><g transform="translate(-472.167 -233)"><path d="M494.532,248l-9.983-15-9.983,15H480.9v11.02h7.3V248Z" transform="translate(-0.209)" fill="#5955cc"/><rect width="24.348" height="3.804" transform="translate(472.167 264.196)" fill="#5955cc"/></g></svg>
          <p>Update</p>
        </button>
      </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script>
      const $form = $("form");

      let getNumber = () => {
        let name = $(".var-wrapper:last-of-type").find(".var input").attr("name");
        if ( name == undefined ) {
          return `-1`;
        } else {
          var number = parseInt(name.split("-").pop()) + 1;
          return "-" + number;
        }
      }

      const deleteVar = () => {
        $(".var-wrapper > .del").click(function() {
          $(this).closest(".var-wrapper").remove();
        });
      }

      const addStringVar = () => {
        $form.append(`<div class="var-wrapper string">
          <div class="var">
            <input type="text" placeholder="Variable Name" class="input" name="var${getNumber()}">
          </div>
          <div class="val">
            <input type="text" placeholder="String Value" class="input" name="val${getNumber()}">
          </div>
          <div type="button" class="del input">
            <span></span>
            <span></span>
          </div>
        </div>`);
      }

      const addArrayVar = () => {
        $form.append(`<div class="var-wrapper array">
          <div class="var">
            <input type="text" placeholder="Variable Name" class="input" name="var${getNumber()}">
          </div>
          <div class="val">
            <div>
              <div type="button" class="input add">
                <p>Add</p>
              </div>
            </div>
            <div>
              <input type="text" placeholder="Key" class="input key" name="var${getNumber()}-[1]">
              <input type="text" placeholder="Value" class="input value" name="val${getNumber()}[1]">
              <div type="button" class="del input">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div type="button" class="del input">
            <span></span>
            <span></span>
          </div>
        </div>`);

        addArrayVal();
        deleteArrayVal();
      }

      const addArrayVal = () => {
        $(".var-wrapper.array").find(".add").click(function() {
          let getNumber = () => {
            let name = $(this).closest(".val").find("> div").length - 1;
            if ( name == 0 ) {
              return `[1]`;
            } else {
              var number = parseInt(name) + 1;
              return "[" + number + "]";
            }
          };

          let getVarNumber = () => {
            let name = $(this).closest(".var-wrapper").find(".var input").attr("name");
            var number = name.split("-").pop();
            return "-" + number;
          }

          $(this).closest(".val").append(`<div>
            <input type="text" placeholder="Key" class="input key" name="var${getVarNumber()}-${getNumber()}">
            <input type="text" placeholder="Value" class="input value" name="val${getVarNumber()}${getNumber()}">
            <div type="button" class="del input">
              <span></span>
              <span></span>
            </div>
          </div>`);

          deleteArrayVal();
        });
      }

      const deleteArrayVal = () => {
        $(".var-wrapper.array").find(".val .del").click(function(ev) {
          $(this).parent("div").remove();
        });
      }

      const addBooleanVar = () => {
        $form.append(`<div class="var-wrapper boolean">
          <div class="var">
            <input type="text" placeholder="Variable Name" class="input" name="var${getNumber()}">
          </div>
          <div class="val">
            <div>
              <input type="radio" value="true" class="input" name="val${getNumber()}" checked>
              <p>True</p>
            </div>
            <div>
              <input type="radio" value="false" class="input" name="val${getNumber()}">
              <p>False</p>
            </div>
          </div>
          <div type="button" class="del input">
            <span></span>
            <span></span>
          </div>
        </div>`);
      }

      const updateSession = () => {

      }

      deleteVar();
      addArrayVal();
      deleteArrayVal();

      $("footer").find("button").click(function(ev){
        let value = $(this).val();
        switch (value) {
          case "string":
            addStringVar();
            break;
          case "array":
            addArrayVar();
            break;
          case "boolean":
            addBooleanVar();
            break;
          case "update":
            $("form").submit();
            break;
          case "destroy":
            $("form").append('<input type="hidden" name="response" value="' + value + '"/>');
            setTimeout(function() {
              $("form").submit();
            }, 0100);
            break;
        }
        deleteVar();
      });


    </script>
  </body>
</html>
