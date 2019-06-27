import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';

export const ContainerApp = styled(Container)`
    max-width: 900px !important
    display: flex;
    justify-content: space-between;
    padding: 5px;
`

export const RowSubtitle = styled(Row)`
width: 100%;
padding: 20px 0;
margin: 20px 0 0 0 !important
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
`