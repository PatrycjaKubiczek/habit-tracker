import styled from 'styled-components';
import { Container, Col } from 'react-bootstrap';

export const ContainerHabits = styled(Container)`
max-width: 900px !important;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
// padding: 0 !important;
`

export const StyledCol = styled(Col)`
.error {
     border-color: red
 }
`

export const ErrorInfo = styled.small`
display: block;
text-align: left;
color: red;
position: absolute;
bottom: 0;
`