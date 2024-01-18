
import styled  from 'styled-components'

const StyledGoogleMap= styled.iframe.attrs(props =>({
  src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.734053703082!2d38.72500447501848!3d8.996601191063453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8685958e63c5%3A0x5f8b26150ce7cda!2zSW50ZXJuYXRpb25hbCBDb21tdW5pdHkgU2Nob29sIG9mIEFkZGlzIEFiYWJhIHwgS2FybCBTcXVhcmUgfCDhiqLhipXhibDhiK3hipPhiL3hipPhiI0g4Yqu4Yid4Yup4YqS4YmyIOGJtS_hiaThibUgfCDhiqvhiK3hiI0g4Yqg4Yuw4Ymj4Ymj4Yut!5e0!3m2!1sen!2set!4v1705428718559!5m2!1sen!2set" ,
  loading:"lazy"

}))`

height:100vh;
width:100vw;

`;
export default function GoogleMap(){
  return(
<StyledGoogleMap/>
  )
}