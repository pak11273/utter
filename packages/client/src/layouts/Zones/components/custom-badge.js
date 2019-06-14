import styled from "styled-components"

export const CustomBadge = styled.div`
  background-color: ${props => props.background};
  top: 10px;
  left: 25px;
  height: 13px;
  display: flex;
  padding: 0 4px;
  z-index: 1;
  position: absolute;
  flex-wrap: wrap;
  font-size: 0.75rem;
  min-width: 13px;
  transform: scale(1) translate(50%, -50%);
  box-sizing: border-box;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  align-content: center;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  transform-origin: 100% 0%;
`
CustomBadge.defaultProps = {
  background: "#e3e3e3"
}
