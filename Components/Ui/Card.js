import classes from './Card.module.css';
const Card = (props)=>{
    return(
        <div className={classes.card}>
        <div className="card-body">
            <div>{props.children}</div>
        </div>
        </div>
    )
};
export default Card;