export default `
<xml>

{%if cam%}
                                            <!--
    <category name="Sensor" colour="250">
        <block type="coderbot_cam_average"></block>
        <block type="coderbot_adv_pathAhead"></block>
        <block type="coderbot_adv_findLine"></block>
        <block type="coderbot_adv_findSignal"></block>
        <block type="coderbot_adv_findFace"></block>
        <block type="coderbot_adv_findColor">
            <value name="COLOR">
                <block type="colour_picker">
                </block>
            </value>
        </block>
        <block type="coderbot_adv_findText">
            <value name="COLOR">
                <block type="colour_picker">
                </block>
            </value>
        </block>
        <block type="coderbot_adv_findQRCode"></block>
        <block type="coderbot_adv_findARCode"></block>
        <block type="coderbot_adv_find_class"></block>
        <block type="coderbot_adv_cnn_classify"></block>
        <block type="coderbot_sonar_get_distance"></block>
    </category>
    -->
    {%endif%}

    <category name="&#160;&#160; %{BKY_CAT_COMMON}" colour="%{BKY_LOGIC_HUE}">
        <block type="input_sensor">
            <field name="sensor">1</field>
        </block>
        <!-- <block type="controls_if" inline="false">
            <value name="IF0">
                <block type="math_equal">
                    <field name="cond">></field>
                    <value name="left">
                        <block type="input_sensor">
                            <field name="sensor">1</field>
                        </block>
                    </value>
                    <value name="right">
                        <shadow type="math_number">
                            <field name="number">500</field>
                        </shadow>
                    </value>
                </block>
            </value>
        </block> -->
        <block type="control_if" inline="false">
            <value name="condition">
                <block type="math_equal">
                    <field name="cond">></field>
                    <value name="left">
                        <block type="input_sensor">
                            <field name="sensor">1</field>
                        </block>
                    </value>
                    <value name="right">
                        <shadow type="math_number">
                            <field name="number">500</field>
                        </shadow>
                    </value>
                </block>
            </value>
        </block>

        <block type="control_forever"></block>

        <block type="action_beep"></block>
        <block type="display_number">
            <value name="value">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>

        <block type="action_wait_sec">
            <value name="NUMBER">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
        </block>

        <block type="action_wait">
            <value name="NAME">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>

        <block type="action_motor"></block>
        <block type="motor_action_turn">
            <title name="turn">on</title>
        </block>


    </category>

    <sep></sep>

    <category name="%{BKY_ICON_LOGIC}&#160;&#160; %{BKY_CAT_LOGIC}" colour="%{BKY_LOGIC_HUE}">
        <!--
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        -->

        <block type="control_if"></block>

        <block type="control_if_state_change"></block>

        <block type="control_ifelse"></block>

        <block type="math_equal" inline="true">
            <value name="right">
                <shadow type="math_number">
                    <field name="number">500</field>
                </shadow>
            </value>
        </block>

        <block type="math_in_between">
            <value name="lower">
                <shadow type="math_number">
                    <field name="number">0</field>
                </shadow>
            </value>
            <value name="upper">
                <shadow type="math_number">
                    <field name="number">100</field>
                </shadow>
            </value>
        </block>

        <block type="math_andor" inline="true"></block>

        <block type="math_not" inline="false"></block>
        <!-- <block type="logic_boolean"></block> -->

    </category>


    <category name="%{BKY_ICON_LOOP}&#160;&#160; %{BKY_CAT_LOOPS}" colour="%{BKY_COLOR_LOOP}">
        <!--
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
        -->

        <block type="control_forever_wait">
            <value name="NAME">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>

        </block>

        <block type="control_forever"></block>
        <block type="control_repeat" inline="true">
            <value name="times">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>

        <block type="control_waituntil"></block>


        <block type="control_waituntil">
            <value name="NAME">
                <block type="math_equal">
                    <field name="cond">></field>
                    <value name="left">
                        <block type="input_sensor">
                            <field name="sensor">1</field>
                        </block>
                    </value>
                    <value name="right">
                        <shadow type="math_number">
                            <field name="number">500</field>
                        </shadow>
                    </value>
                </block>
            </value>
        </block>

        <block type="procedure_stop"></block>

    </category>


    <category name="%{BKY_ICON_MATH}&#160;&#160; %{BKY_CAT_MATH}" colour="%{BKY_COLOR_MATH}">
        <!--
        <block type="math_number">
            <field name="number">123</field>
        </block>
        <block type="math_arithmetic">
            <value name="A">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
        </block>
        -->

        <block type="math_number">
            <field name="number">10</field>
        </block>

        <block type="math_operator">
            <value name="1stNum">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
            <value name="2ndNum">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
        </block>

        <!-- <block type="math_random"></block> -->

        <block type="variable_increase_by">
            <value name="increment">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
        </block>
        <block type="variable_decrease_by">
            <value name="increment">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
        </block>

    </category>

    <category name="%{BKY_ICON_SENSOR}&#160;&#160;&#160; %{BKY_CAT_SENSING}" colour="%{BKY_COLOR_SENSOR}">
        <block type="input_sensor"></block>
        <block type="input_switch"></block>

        <block type="input_switch_was_pressed"></block>
        <block type="input_switch_was_released"></block>

        <block type="math_equal">
            <field name="cond">></field>
            <value name="left">
                <block type="input_sensor">
                    <field name="sensor">1</field>
                </block>
            </value>
            <value name="right">
                <shadow type="math_number">
                    <field name="number">500</field>
                </shadow>
            </value>
        </block>

        <!-- <block type="controls_if" inline="false">
            <value name="IF0">
                <block type="math_equal">
                    <field name="cond">></field>
                    <value name="left">
                        <block type="input_sensor">
                            <field name="sensor">1</field>
                        </block>
                    </value>
                    <value name="right">
                        <shadow type="math_number">
                            <field name="number">500</field>
                        </shadow>
                    </value>
                </block>
            </value>
        </block> -->

        <block type="control_if" inline="false">
            <value name="condition">
                <block type="math_equal">
                    <field name="cond">></field>
                    <value name="left">
                        <block type="input_sensor">
                            <field name="sensor">1</field>
                        </block>
                    </value>
                    <value name="right">
                        <shadow type="math_number">
                            <field name="number">500</field>
                        </shadow>
                    </value>
                </block>
            </value>
        </block>

    </category>

    <category name="%{BKY_ICON_MOTOR}&#160;&#160; %{BKY_CAT_DC_MOTOR}" colour="%{BKY_COLOR_MOTOR}">
        <block type="action_motor"></block>
        <block type="motor_action_turn">
            <title name="turn">on</title>
        </block>
        <block type="motor_action_turn">
            <title name="turn">off</title>
        </block>
        <block type="motor_action_onfor">
            <value name="value">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
        <block type="motor_action_thisway">
            <title name="clockwise">cw</title>
        </block>
        <block type="motor_action_thisway">
            <title name="clockwise">ccw</title>
        </block>
        <block type="motor_action_rd"></block>
        <block type="motor_action_power">
            <value name="power">
                <shadow type="math_number_motor_power">
                    <field name="number">100</field>
                </shadow>
            </value>
        </block>
        <block type="action_motor_is_on"></block>
        <block type="action_motor_is_cw"></block>
    </category>

    <category name="%{BKY_ICON_SERVO_MOTOR}&#160;&#160; %{BKY_CAT_SERVO_MOTOR}" colour="%{BKY_COLOR_MOTOR}">
        <block type="action_motor">
            <title name="a">a</title>
            <title name="b"></title>
            <title name="c"></title>
            <title name="d"></title>
        </block>
        <block type="servo_seth">
            <value name="heading">
                <shadow type="math_number_servo">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
        <block type="servo_lt">
            <value name="heading">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
        <block type="servo_rt">
            <value name="heading">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
    </category>
    <category name="%{BKY_ICON_SOUND}&#160;&#160; %{BKY_CAT_SOUND}" colour="%{BKY_COLOR_SOUND}">
        <block type="action_beep"></block>
    </category>

    <category name="%{BKY_ICON_TIME}&#160;&#160; %{BKY_CAT_TIME}" colour="%{BKY_COLOR_TIME}">
        <block type="action_wait_sec">
            <value name="NUMBER">
                <shadow type="math_number">
                    <field name="number">1</field>
                </shadow>
            </value>
        </block>
        <block type="action_wait">
            <value name="NAME">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
        <block type="action_gettimer"></block>
        <block type="action_reset_timer"></block>
        <block type="action_settickrate">
            <value name="NAME">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
        <block type="control_if_ticked"></block>
        <block type="action_ticked"></block>
        <block type="action_gettickcount"></block>
        <block type="action_cleartick"></block>
    </category>


    <category name="%{BKY_ICON_IR_REMOTE}&#160; %{BKY_CAT_IR_CONTROL}" colour="%{BKY_COLOR_IR_REMOTE}">
        <block type="input__output__storage_new_ir"></block>
        <block type="input__output__storage_get_ir"></block>
    </category>

    <category name="%{BKY_ICON_DISPLAY_MODULE}&#160; %{BKY_CAT_BUILTIN_DISPLAY}" colour="#5cb1d6">
        <block type="display_text">
            <title name="text">text</title>
        </block>
        <block type="display_number">
            <value name="value">
                <shadow type="math_number">
                    <field name="number">10</field>
                </shadow>
            </value>
        </block>
    </category>


    <category id="addOnModules" name="&#160;&#160; %{BKY_CAT_ADDON_MODULES}" colour="#5cb1d6">
        <category name="%{BKY_ICON_CLOCK_MODULE}&#160;&#160; %{BKY_CAT_ADDON_CLOCK}" colour="#5cb1d6">
            <block type="clock_date">
                <title name="date">4</title>
            </block>

            <block type="clock_date">
                <title name="date">5</title>
            </block>

            <block type="clock_date">
                <title name="date">6</title>
            </block>

            <block type="clock_date">
                <title name="date">2</title>
            </block>

            <block type="clock_date">
                <title name="date">1</title>
            </block>

            <block type="clock_date">
                <title name="date">0</title>
            </block>

            <block type="clock_date">
                <title name="date">3</title>
            </block>

        </category>


        <category name="%{BKY_ICON_DISPLAY_MODULE}&#160; %{BKY_CAT_ADDON_DISPLAY}" colour="#5cb1d6" class="aClass">>
            <block type="display_text">
                <title name="text">text</title>
            </block>
            <block type="display_number">
                <value name="value">
                    <shadow type="math_number">
                        <field name="number">10</field>
                    </shadow>
                </value>
            </block>
            <block type="display_movecursor">
                <title name="num">position</title>
            </block>
            <block type="display_clearscreen"></block>
        </category>


        <category name="%{BKY_ICON_VOICE_MODULE}&#160;&#160; %{BKY_CAT_ADDON_VOICE}" colour="#5cb1d6">
            <block type="recorder_play"></block>
            <block type="recorder_next"></block>
            <block type="recorder_prev"></block>
            <block type="recorder_select">
                <title name="track">N</title>
            </block>
            <block type="recorder_eraseall"></block>
        </category>

        <category name="%{BKY_ICON_I2C}&#160;&#160; %{BKY_CAT_ADDON_I2C}" colour="210">

            <block type="i2c_write" inline="true">

                <value name="value">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>

                <value name="reg_addr">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>

                <value name="i2c_addr">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>
            </block>

            <block type="i2c_read">
                <value name="reg_addr">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>

                <value name="i2c_addr">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>
            </block>
        </category>

    </category>
    <category id="rPiBlocks" name="&#160;&#160; %{BKY_CAT_RASPBERRY_PI}" colour="#d81b60">
        <category name="%{BKY_ICON_PI_CAMERA}&#160;&#160; %{BKY_CAT_CAMERA}" colour="%{BKY_COLOR_PI_CAMERA}" class="rPiBlocks">
            <block type="use_camera"></block>
            <block type="close_camera"></block>
            <block type="start_find_face"></block>
            <block type="stop_find_face"></block>
            <block type="found_face"></block>
            <block type="take_snapshot"></block>
            <block type="camera_is_on"></block>
            <block type="find_face_is_on"></block>
        </category>
        <category name="%{BKY_ICON_PI_CLOUD_SERVICE}&#160;&#160; %{BKY_CAT_CLOUD_SERVICE}" colour="%{BKY_COLOR_PI_CLOUD_SERVICE}" class="rPiBlocks">
            <block type="ifttt_trigger">
                <value name="message">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>
            </block>
            <block type="ifttt_trigger">
                <value name="message">
                    <block type="text"></block>
                </value>
            </block>
            <block type="telegram_message">
                <value name="message">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>
            </block>
            <block type="telegram_message">
                <title name="message_type">Message</title>
                <value name="message">
                    <block type="text"></block>
                </value>
            </block>
            <block type="telegram_message">
                <title name="message_type">Image</title>
                <value name="message">
                    <block type="text"></block>
                </value>
            </block>
            <block type="if_telegram_message">
                <value name="key_value_input">
                    <block type="text"></block>
                </value>
            </block>
        </category>
        <category name="%{BKY_ICON_PI_DATA_LOGGING}&#160;&#160; %{BKY_CAT_DATA_LOGGING}" colour="%{BKY_COLOR_PI_DATA_LOGGING}" class="rPiBlocks">
            <block type="record_as" inline="true">
                <value name="string">
                    <block type="text"></block>
                </value>
            </block>
        </category>
        <category name="%{BKY_ICON_PI_EMAIL}&#160;&#160; %{BKY_CAT_EMAIL}" colour="%{BKY_COLOR_PI_EMAIL}" class="rPiBlocks">
            <block type="send_email">
                <value name="email">
                    <block type="text"></block>
                </value>
                <value name="title">
                    <block type="text"></block>
                </value>
                <value name="body">
                    <block type="text"></block>
                </value>
            </block>
        </category>

        <!-- <category name="Finger Scan" class="rPiBlocks">
            <block type="use_finer_scan"></block>
            <block type="identify_finger"></block>
            <block type="enroll_finger"></block>
        </category> -->

        <category name="%{BKY_ICON_PI_GOGO_COM}&#160;&#160; %{BKY_CAT_PI_GOGO_COM}" colour="%{BKY_COLOR_PI_GOGO_COM}" class="rPiBlocks">
            <block type="key_value">
                <title name="key_name">button</title>
                <value name="key_value_input">
                    <block type="text"></block>
                </value>
            </block>

            <block type="key_value_unrestricted">
                <value name="key_name">
                    <block type="text"></block>
                </value>
                <value name="key_value_input">
                    <block type="text"></block>
                </value>
            </block>

            <block type="get_int_value_of_key">
                <value name="key_name">
                    <block type="text"></block>
                </value>
            </block>

            <block type="send_string_message">
                <value name="message">
                    <block type="text"></block>
                </value>
                <value name="topic">
                    <block type="text"></block>
                </value>
            </block>

            <block type="send_number_message">
                <value name="message">
                    <shadow type="math_number">
                        <field name="number">0</field>
                    </shadow>
                </value>
                <value name="topic">
                    <block type="text"></block>
                </value>
            </block>
        </category>

        <category name="%{BKY_ICON_PI_IMAGE}&#160;&#160; %{BKY_CAT_PI_IMAGE}" colour="%{BKY_COLOR_PI_IMAGE}" class="rPiBlocks">
            <block type="show_image" inline="true">
                <value name="string">
                    <block type="text"></block>
                </value>
            </block>
            <block type="hide_image"></block>
            <block type="screen_tapped"></block>
        </category>
        <!-- <category name="RFID" class="rPiBlocks">
            <block type="userfid"></block>
            <block type="read_from_rfid"></block>
            <block type="write_to_rfid"></block>
        </category> -->
        <category name="%{BKY_ICON_PI_SOUND}&#160;&#160; %{BKY_CAT_SOUND}" colour="%{BKY_COLOR_PI_SOUND}" class="rPiBlocks">
            <block type="play_sound" inline="true">
                <value name="string">
                    <block type="text"></block>
                </value>
            </block>
            <block type="stop_sound"></block>
            <block type="say" inline="true">
                <value name="string">
                    <block type="text"></block>
                </value>
            </block>
        </category>
        <category name="%{BKY_ICON_PI_SMS}&#160;&#160; %{BKY_CAT_PI_SMS}" colour="%{BKY_COLOR_PI_SMS}" class="rPiBlocks">
            <block type="send_sms">
                <value name="number">
                    <block type="text"></block>
                </value>
                <value name="message">
                    <block type="text"></block>
                </value>
            </block>
        </category>

    </category>
    <sep></sep>
    <category name="%{BKY_CAT_DEFINITION}" colour="%{BKY_COLOR_DEFINITION}">
        <block type="action_define_operation_name"></block>
        <block type="get_defined_operation_name"></block>
    </category>
    <category name="%{BKY_VARIABLES}" custom="VARIABLE" colour="330"></category>
    <category name="%{BKY_PROCEDURES}" custom="PROCEDURE" colour="290">
        <block type="procedure_stop"></block>
    </category>
</xml>`

