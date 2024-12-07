import { RotatingLines } from "react-loader-spinner";
import './loading.css'
export const Loader = () => {
    return (
        <div className="loading">
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    )
}
