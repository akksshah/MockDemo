import React from 'react';
import styles from './FormBuilder.module.css';
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Checkbox from "../Checkbox/Checkbox";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select"
import {FormService} from "../../Rest_API/MockService";

const start_state_of_form = {
    label: "",
    defaultValue: "",
    choices: "",
    val_err: [],
    required: false,
};

const label_required_err = "Label is required.";
const zero_choice_err = "Atleast 1 choice to be provided";
const duplicate_choices_err = "Duplicate choices are not allowed.";
const max_choice_count_err = "You may only add up to 50 choices.";
const session_key = "FieldBuilderData";

export default class FormBuilder extends React.Component {
    state = (
        (
            sessionStorage.getItem(session_key)
            && JSON.parse(sessionStorage.getItem(session_key))
        )
        || start_state_of_form
    );

    Form_Submit_Event = async e => {
        e.preventDefault();
        const { label, defaultValue, choices, required } = this.state;
        let choicesArray = choices.split("\n");

        if(choicesArray[0] === '') {
            console.log('hi');
            choicesArray.shift()
        }

        if (!choicesArray.includes(defaultValue)) {
            if (defaultValue !== '') {
                this.setState({choices: `${defaultValue}\n${choices}`});
                choicesArray.push(defaultValue);
            }
        }

        if (!this.doesFormContainErrors(choicesArray)) {

            let x = (document.getElementsByName("opt")[0].value);

            if (x === 'Alphabetical') {
                choicesArray = choicesArray.sort()
            }

            if (x === 'Descending_Alphabetical') {
                choicesArray = choicesArray.sort();
                choicesArray = choicesArray.reverse();
            }
            const requestData = {
                label,
                default: defaultValue,
                choices: choicesArray,
                required,
                displayAlpha: true,
            };

            console.log("Data sent to API ", requestData);
            const response = await FormService.postRequest(requestData);
            console.log("mock call response", response);
        }
    };

    doesFormContainErrors = choicesArray => {
        const { label } = this.state;
        let newErrors = [];
        if (!label.length) newErrors.push(label_required_err);
        let dup = false;
        const sortedChoices = [...choicesArray].sort();
        // const remove = sortedChoices.shift()
        for (let i = 0; i < sortedChoices.length - 1; i++) {
            for(let j = i + 1; j < sortedChoices.length; j++)
            if (sortedChoices[i] === sortedChoices[j]) {
                dup = true;
                break;
            }
        }
        if (sortedChoices.length == 0 ) newErrors.push(zero_choice_err)
        if (sortedChoices.length > 50) newErrors.push(max_choice_count_err)
        // if (choicesArray.length > 50) newErrors.push(max_choice_count_err);
        if (dup) newErrors.push(duplicate_choices_err);
        this.setState({ val_err: newErrors });
        return !!newErrors.length;
    };
    Change_Made_On_Required_Field = checked => {
        this.setState({ required: checked }, this.Store_In_Session);
    };
    Store_In_Session = () => {
        sessionStorage.setItem(session_key, JSON.stringify(this.state));
    };
    Change_Of_Input = e => {
        this.setState({ [e.target.name]: e.target.value }, this.Store_In_Session);
    };
    Reset_Form = () => {
        this.setState(start_state_of_form);
        sessionStorage.removeItem(session_key);
    };
    render() {
        const { label, defaultValue, choices, required, val_err } = this.state;
        console.log(val_err);
        return (
            <div>
                <form className={styles.root} onSubmit={this.Form_Submit_Event}>
                    <div className={styles.header}>Field Builder</div>

                    <div className={styles.fields_container}>
                        <div className={styles.label}>Label</div>
                        <TextInput name="label" value={label} onChange={this.Change_Of_Input} />
                        <div className={styles.label}>Type</div>
                        <div className={styles.multipleSelect}>
                            <div className={styles.multipleSelectValue}>Multi-select</div>
                            <Checkbox
                                checked={required}
                                onChange={this.Change_Made_On_Required_Field}
                                label="A Value is required"
                            />
                        </div>
                        <div className={styles.label}>Default Value</div>
                        <TextInput name="defaultValue" value={defaultValue} onChange={this.Change_Of_Input}/>
                        <div className={styles.label}>Choices</div>
                        <TextArea name="choices" value={choices} onChange={this.Change_Of_Input} />
                        <div className={styles.label}>Order</div>
                        <Select name="opt"
                                options={[
                                    { value: "Alphabetical", display: "Display choices in Alphabetical" },
                                    { value: "Descending_Alphabetical", display: "Display choices in Descending Alphabetical" },
                                    { value: "Choice3", display: "Any other choice can be given by updating here"},
                                ]}
                        />
                        <div className={styles.bottomContainer}>
                            <Button type="submit" width="250px" height="50px" backgroundColor="green" color="white" onClick={this.Form_Submit_Event}>
                                Save changes
                            </Button>
                            <div className={`${styles.label} ${styles.bottomText}`}>Or</div>
                            <div className={styles.cancelLink} onClick={this.Reset_Form}>
                                Cancel
                            </div>
                        </div>
                    </div>
                    {!!val_err.length && (
                        <ul className={styles.errorContainer}>
                            {val_err.map(error => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
        )
    }
}
