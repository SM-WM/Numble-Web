import { NumbersRounded } from "@mui/icons-material"
import Number from "./Number"

type RowProps = {
    guess: Array<string>;
};
export default function Row({guess} : RowProps) {
    
    return(
        <div className="row">    
            {Array.from({length: 4}).map((_, i) => {
                return <Number content = {guess[i] || ''} />
            } ) }    
            {/* {guess.map((char, i) => {
            //     return <Number content = {char} />
            // })} */}
        </div>

    )
}

