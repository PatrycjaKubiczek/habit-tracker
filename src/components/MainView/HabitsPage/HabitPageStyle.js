import styled from 'styled-components';

export const StyledCol = styled.div`
.col {
    margin: 2px;
    cursor: pointer;
    user-select: none;
}

.calendar {
    cursor: default
}
.error {
    border-color: red
}
.row__subtitle {
    width: 100%;
    padding: 20px 0;
    margin: 20px 0 0 0;
    justify-content: space-between;
    @media screen and (max-width: 769px){
        justify-content: center
        .col-md-6 {
            padding: 0 !important;
        }
    }
    h2 {
        text-transform: capitalize;
    }
}
.container__loading {
    display: flex;
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    height: 90vh;
}
.container__app {
    max-width: 900px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
}
.container__habits {
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.container__stats{
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    max-width: 900px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 5px;
    user-select: none;
    box-shadow: 0px 2px 3px rgba(0,0,0,.03), 1px 2px 2px rgba(0,0,0,.03), -1px -2px 2px rgba(0,0,0,.03);
}
.input__error {
    display: block;
    text-align: left;
    color: red;
    position: absolute;
    bottom: 0
}
`