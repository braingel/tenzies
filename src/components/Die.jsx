export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    return (
        <div className="main--die" style={styles} onClick={props.handleClick}>
            {props.value}
        </div>
    )
}