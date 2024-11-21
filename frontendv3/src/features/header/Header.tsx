import { useState } from "react"
// import { useAppDispatch, useAppSelector } from "../../app/hooks"
// import styles from "./Login.module.css"
import './header.css'
import Grid from '@mui/material/Grid2';
import { Box, Button, Input, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const Header = () => {
    // const dispatch = useAppDispatch()
    return (
        <>
            <div className="head-banner">
                <Grid container justifyContent={"center"}>
                    <Grid size={12}>
                        <h1 style={{ textAlign: "center" }}>The Supermarket Shopping Mall</h1>
                    </Grid>
                    <Grid size={12}>
                        <p style={{ textAlign: "center" }}>Shop Online For Deals & Save.</p>
                    </Grid>
                    <Grid size={12}>
                        <span
                            style={{ fontSize: "20px" }}
                        // style="font-size:20px;"
                        >👶</span>
                        <span
                            style={{ fontSize: "20px", verticalAlign: "middle" }}
                        // style={"font-size:20px; vertical-align: middle;"}
                        >🛒</span>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
