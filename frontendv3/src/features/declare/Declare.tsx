import { useState } from "react"
// import { useAppDispatch, useAppSelector } from "../../app/hooks"
// import styles from "./Login.module.css"
import './declare.css'
import Grid from '@mui/material/Grid2';
import { Box, Button, Input, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const Declare = () => {
    // const dispatch = useAppDispatch()
    return (
        <>
            <div className="head-banner">
                <Grid container>
                    <Grid size={12}>
                        <p>關於我們</p>
                    </Grid>
                    <Grid size={12}>
                        <p>客戶服務</p>
                    </Grid>
                    <Grid size={12}>
                        <p><a href="mailto:someone@example.com">電郵: abc.info@abc.com.hk</a></p>
                    </Grid>
                    <Grid size={12}>
                        <p>電話: +852 1234 5678</p>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
