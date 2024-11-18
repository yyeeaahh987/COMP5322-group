import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Login.module.css"
import Grid from '@mui/material/Grid2';
import { Button, Input, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    validateLogin
} from "./userSlice"

// enum GenderEnum {
//     female = "female",
//     male = "male",
//     other = "other",
// }
// interface IFormInput {
//     firstName: string
//     gender: GenderEnum
//   }

interface IFormInput {
    accountName: string
    accountPasswowrd: string
}

export const Login = () => {
    const dispatch = useAppDispatch()
    //   const count = useAppSelector(selectCount)
    //   const status = useAppSelector(selectStatus)
    //   const [incrementAmount, setIncrementAmount] = useState("2")

    //   const incrementValue = Number(incrementAmount) || 0
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ 
        defaultValues: { 
            accountName: "",
            accountPasswowrd: "",
        } 
    });
    const onSubmit: SubmitHandler<any> = (data) => {
        console.log(data)
        dispatch(validateLogin(data))
    }

    function handleReset() {
        reset({
            accountName: "",
            accountPasswowrd: "",
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid size={12}>
                        <Controller
                            name="accountName"
                            control={control}
                            render={({ field }) => <TextField  {...field} />}
                        />
                    </Grid>
                    <Grid size={12}>
                        <Controller
                            name="accountPasswowrd"
                            control={control}
                            render={({ field }) => <TextField  {...field} />}
                        />
                        {/* {errors.exampleRequired && <span>This field is required</span>} */}
                    </Grid>
                    <Grid size={6}>
                        <Button className="submit-button" variant="outlined" type="submit">Submit</Button>
                    </Grid>
                    <Grid size={6}>
                        <Button className="clear-button" variant="outlined" onClick={handleReset}>Clear</Button>
                    </Grid>
                </Grid>
            </form>
        </>
        // <div>
        //   <div className={styles.row}>
        //     <button
        //       className={styles.button}
        //       aria-label="Decrement value"
        //       onClick={() => dispatch(decrement())}
        //     >
        //       -
        //     </button>
        //     <span aria-label="Count" className={styles.value}>
        //       {count}
        //     </span>
        //     <button
        //       className={styles.button}
        //       aria-label="Increment value"
        //       onClick={() => dispatch(increment())}
        //     >
        //       +
        //     </button>
        //   </div>
        //   <div className={styles.row}>
        //     <input
        //       className={styles.textbox}
        //       aria-label="Set increment amount"
        //       value={incrementAmount}
        //       type="number"
        //       onChange={e => {
        //         setIncrementAmount(e.target.value)
        //       }}
        //     />
        //     <button
        //       className={styles.button}
        //       onClick={() => dispatch(incrementByAmount(incrementValue))}
        //     >
        //       Add Amount
        //     </button>
        //     <button
        //       className={styles.asyncButton}
        //       disabled={status !== "idle"}
        //       onClick={() => dispatch(incrementAsync(incrementValue))}
        //     >
        //       Add Async
        //     </button>
        //     <button
        //       className={styles.button}
        //       onClick={() => {
        //         dispatch(incrementIfOdd(incrementValue))
        //       }}
        //     >
        //       Add If Odd
        //     </button>
        //   </div>
        // </div>
    )
}
