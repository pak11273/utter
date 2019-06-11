export const customStyles = {
  control: styles => ({
    ...styles,
    fontFamily: "Arial",
    margin: "20px",
    padding: "3px",
    position: "relative",
    width: "200px",
    height: "50px",
    borderWidth: "1px",
    borderColor: "rgba(0, 0, 0, 0.87)",
    borderRadius: "5px"
  }),
  option: (styles, {data, isDisabled, isSelected}) => {
    return {
      ...styles,
      fontFamily: "Arial",
      backgroundColor: "white",
      color: isDisabled ? "#ccc" : isSelected ? "#2b59ae" : data.color,
      ":active": {
        ...styles[":active"],
        fontFamily: "Arial",
        backgroundColor: !isDisabled && (isSelected ? data.color : "#2b59ae")
      },
      ":hover": {
        backgroundColor: "#2b59ae",
        color: "white"
      }
    }
  },
  menu: styles => ({...styles, zIndex: 99})
}
