import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import Validations from './Validation'
import Demography from './Demography'
import Breadcrumbs from '@components/breadcrumbs'

const ReactstrapValidation = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Patients Demography'
        breadCrumbParent='Form'
        breadCrumbActive='Reactstrap Demography'
      />
      <Row>
        <Col sm='12'>
          <Demography />
        </Col>
      </Row>
    </Fragment>
  )
}
export default ReactstrapValidation
