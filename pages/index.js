import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";

import firebase from "./config/firebase.js";

export default function Home() {
    const questionPropList = [
        { id: 0, value: "yes", text: "はい" },
        { id: 1, value: "no", text: "いいえ" },
        { id: 2, value: "other", text: "わからない" },
    ];

    const { register, handleSubmit, watch, control } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        firebase
            .firestore()
            .collection("questionnaire_answers")
            .add({
                BirthDay: Number(data.BirthDay),
                question1: data.question1,
                question2: data.question2,
                lastQuestion: data.lastQuestion,
            });
    };
    const onError = (errors, e) => console.log(errors, e);

    const watchQ1 = watch("question1", null);
    const watchQ2 = watch("question2", null);

    function LastQuestion() {
        const isShow = watchQ1 === "yes" || watchQ2 === "yes";

        if (isShow) {
            return (
                <>
                    <label htmlFor="lastQuestion">
                        これまでに学習した言語を教えて下さい
                    </label>
                    <div id="lastQuestion">
                        <TextField
                            label="これまで学習した言語"
                            multiline
                            rows={2}
                            {...register("lastQuestion")}
                            margin="normal"
                        />
                    </div>
                </>
            );
        } else {
            return <></>;
        }
    }

    return (
        <>
            <h1>プログラミング学習に関するアンケート</h1>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <label htmlFor="inputBirthDay">
                    生年月日を8桁の数字で入力してください
                </label>
                <div id="inputBirthDay">
                    <TextField
                        label="生年月日"
                        required
                        {...register("BirthDay")}
                        margin="normal"
                        inputProps={{
                            inputMode: "numetric",
                            pattern: "[0-9]*",
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="question1_wrapper">
                        現在、プログラミングを学習していますか？
                    </label>
                    <RadioGroup id="question1_wrapper">
                        <Controller
                            render={({ field }) => {
                                return (
                                    <>
                                        {questionPropList.map((props) => {
                                            return (
                                                <FormControlLabel
                                                    {...field}
                                                    value={props.value}
                                                    name="question1"
                                                    label={props.text}
                                                    control={<Radio />}
                                                />
                                            );
                                        })}
                                    </>
                                );
                            }}
                            name="question1"
                            control={control}
                        />
                    </RadioGroup>
                </div>
                <div>
                    <label htmlFor="question2_wrapper">
                        これまでに、プログラミングを学習したことがありますか？
                    </label>
                    <RadioGroup id="question2_wrapper">
                        <Controller
                            render={({ field }) => {
                                return (
                                    <>
                                        {questionPropList.map((props) => {
                                            return (
                                                <FormControlLabel
                                                    {...field}
                                                    value={props.value}
                                                    name="question2"
                                                    label={props.text}
                                                    control={<Radio />}
                                                />
                                            );
                                        })}
                                    </>
                                );
                            }}
                            name="question2"
                            control={control}
                        />
                    </RadioGroup>
                </div>
                <LastQuestion />
                <button type="submit">提出</button>
            </form>
        </>
    );
}

//test
