import { NumbersRounded } from "@mui/icons-material"
import Number from "./Number"

type RowProps = {
    guess: Array<string>;
};
export default function Row({guess} : RowProps) {
    
    return(
        <div className="row">        
            {guess.map((char, i) => {
                return <Number content = {char} />
            })}
        </div>

    )
}

