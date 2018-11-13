import React, {PureComponent} from "react"
import {Button, Icon, Header, Modal} from "semantic-ui-react"

export default class Terms extends PureComponent {
  state = {modalOpen: false}

  handleOpen = () => this.setState({modalOpen: true})

  handleClose = () => this.setState({modalOpen: false})

  render() {
    const {modalOpen} = this.state
    return (
      <Modal
        open={modalOpen}
        onClose={this.handleClose}
        trigger={
          <a href="#" onClick={this.handleOpen}>
            Terms and Conditions
          </a>
        }>
        <Modal.Content>
          <Modal.Description>
            <Header>Utterzone Terms and Conditions</Header>
            <p>
              You are agreeing to these terms and conditions when you use our
              service.{" "}
            </p>
            <p>
              Our Platform is very diverse, so sometimes additional terms or
              product requirements (including age requirements) may apply.
              Additional terms will be available with the relevant Platform, and
              those additional terms become part of your agreement with us if
              you use those Platform.
            </p>
            <Header as="h4">Using our Platform</Header>
            <p>
              You must follow any policies made available to you within the
              Platform.
            </p>
            <p>
              Don’t misuse our Platform. For example, don’t interfere with our
              Platform or try to access them using a method other than the
              interface and the instructions that we provide. You may use our
              Platform only as permitted by law, including applicable export and
              re-export control laws and regulations. We may suspend or stop
              providing our Platform to you if you do not comply with our terms
              or policies or if we are investigating suspected misconduct.
            </p>
            <p>
              Using our Platform does not give you ownership of any intellectual
              property rights in our Platform or the content you access. You may
              not use content from our Platform unless you obtain permission
              from its owner or are otherwise permitted by law. These terms do
              not grant you the right to use any branding or logos used in our
              Platform. Don’t remove, obscure, or alter any legal notices
              displayed in or along with our Platform.
            </p>
            <p>
              Our Platform display some content that is not Utterzone’s. This
              content is the sole responsibility of the entity that makes it
              available. We may review content to determine whether it is
              illegal or violates our policies, and we may remove or refuse to
              display content that we reasonably believe violates our policies
              or the law. But that does not necessarily mean that we review
              content, so please don’t assume that we do.
            </p>
            <p>
              In connection with your use of the Platform, we may send you
              service announcements, administrative messages, and other
              information. You may opt out of some of those communications.
            </p>
            <p>
              Some of our Platform are available on mobile devices. Do not use
              such Platform in a way that distracts you and prevents you from
              obeying traffic or safety laws.
            </p>
            <Header as="h4">Your Utterzone Account</Header>
            <p>
              You may need a Utterzone Account in order to use some of our
              Platform. You may create your own Utterzone Account, or your
              Utterzone Account may be assigned to you by an administrator, such
              as your employer or educational institution. If you are using a
              Utterzone Account assigned to you by an administrator, different
              or additional terms may apply and your administrator may be able
              to access or disable your account.
            </p>
            <p>
              To protect your Utterzone Account, keep your password
              confidential. You are responsible for the activity that happens on
              or through your Utterzone Account. Try not to reuse your Utterzone
              Account password on third-party applications. If you learn of any
              unauthorized use of your password or Utterzone Account please
              contact support.
            </p>
            <Header as="h4">Privacy and Copyright Protection</Header>
            <p>
              Utterzone’s privacy policies explain how we treat your personal
              data and protect your privacy when you use our Platform. By using
              our Platform, you agree that Utterzone can use such data in
              accordance with our privacy policies.
            </p>
            <p>
              We respond to notices of alleged copyright infringement and
              terminate accounts of repeat infringers according to the process
              set out in the U.S. Digital Millennium Copyright Act.
            </p>
            <p>
              We provide information to help copyright holders manage their
              intellectual property online. If you think somebody is violating
              your copyrights and want to notify us please call or email
              support.
            </p>
            <Header as="h4">Your Content in our Platform</Header>
            <p>
              Some of our Platform allow you to upload, submit, store, send or
              receive content. You retain ownership of any intellectual property
              rights that you hold in that content. In short, what belongs to
              you stays yours.
            </p>
            <p>
              When you upload, submit, store, send or receive content to or
              through our Platform, you give Utterzone (and those we work with)
              a worldwide license to use, host, store, reproduce, modify, create
              derivative works (such as those resulting from translations,
              adaptations or other changes we make so that your content works
              better with our Platform), communicate, publish, publicly perform,
              publicly display and distribute such content. The rights you grant
              in this license are for the limited purpose of operating,
              promoting, and improving our Platform, and to develop new ones.
              This license continues even if you stop using our Platform (for
              example, for a business listing you have added to Utterzone Maps).
              Some Platform may offer you ways to access and remove content that
              has been provided to that Service. Also, in some of our Platform,
              there are terms or settings that narrow the scope of our use of
              the content submitted in those Platform. Make sure you have the
              necessary rights to grant us this license for any content that you
              submit to our Platform.
            </p>
            <p>
              Our automated systems analyze your content (including emails) to
              provide you personally relevant product features, such as
              customized search results, tailored advertising, and spam and
              malware detection. This analysis occurs as the content is sent,
              received, and when it is stored.
            </p>
            <p>
              If you have a Utterzone Account, we may display your Profile name,
              Profile photo, and actions you take on Utterzone or on third-party
              applications connected to your Utterzone Account (such as +1’s,
              reviews you write and comments you post) in our Platform,
              including displaying in ads and other commercial contexts. We will
              respect the choices you make to limit sharing or visibility
              settings in your Utterzone Account. For example, you can choose
              your settings so your name and photo do not appear in an ad.
            </p>
            <p>
              You can find more information about how Utterzone uses and stores
              content in the privacy policy or additional terms for particular
              Platform. If you submit feedback or suggestions about our
              Platform, we may use your feedback or suggestions without
              obligation to you.
            </p>
            <Header as="h4">About Software in our Platform</Header>
            <p>
              When a Service requires or includes downloadable software, this
              software may update automatically on your device once a new
              version or feature is available. Some Platform may let you adjust
              your automatic update settings.
            </p>
            <p>
              Utterzone gives you a personal, worldwide, royalty-free,
              non-assignable and non-exclusive license to use the software
              provided to you by Utterzone as part of the Platform. This license
              is for the sole purpose of enabling you to use and enjoy the
              benefit of the Platform as provided by Utterzone, in the manner
              permitted by these terms. You may not copy, modify, distribute,
              sell, or lease any part of our Platform or included software, nor
              may you reverse engineer or attempt to extract the source code of
              that software, unless laws prohibit those restrictions or you have
              our written permission.
            </p>
            <p>
              Open source software is important to us. Some software used in our
              Platform may be offered under an open source license that we will
              make available to you. There may be provisions in the open source
              license that expressly override some of these terms.
            </p>
            <Header as="h4">Modifying and Terminating our Platform</Header>
            <p>
              We are constantly changing and improving our Platform. We may add
              or remove functionalities or features, and we may suspend or stop
              a Service altogether.
            </p>
            <p>
              You can stop using our Platform at any time, although we’ll be
              sorry to see you go. Utterzone may also stop providing Platform to
              you, or add or create new limits to our Platform at any time.
            </p>
            <p>
              We believe that you own your data and preserving your access to
              such data is important. If we discontinue a Service, where
              reasonably possible, we will give you reasonable advance notice
              and a chance to get information out of that Service.
            </p>
            <Header as="h4">Our Warranties and Disclaimers</Header>
            <p>
              We provide our Platform using a commercially reasonable level of
              skill and care and we hope that you will enjoy using them. But
              there are certain things that we don’t promise about our Platform.
            </p>
            <p>
              Other than as expressly set out in these terms or additional
              terms, neither Utterzone nor its suppliers or distributors make
              any specific promises about the Platform. For example, we don’t
              make any commitments about the content within the Platform, the
              specific functions of the Platform, or their reliability,
              availability, or ability to meet your needs. We provide the
              Platform “as is”.
            </p>
            <p>
              Some jurisdictions provide for certain warranties, like the
              implied warranty of merchantability, fitness for a particular
              purpose and non-infringement. To the extent permitted by law, we
              exclude all warranties.
            </p>
            <Header as="h4"> Liability for our Platform</Header>
            <p>
              When permitted by law, Utterzone, and Utterzone’s suppliers and
              distributors, will not be responsible for lost profits, revenues,
              or data, financial losses or indirect, special, consequential,
              exemplary, or punitive damages.
            </p>
            <p>
              To the extent permitted by law, the total liability of Utterzone,
              and its suppliers and distributors, for any claims under these
              terms, including for any implied warranties, is limited to the
              amount you paid us to use the Platform (or, if we choose, to
              supplying you the Platform again).
            </p>
            <p>
              In all cases, Utterzone, and its suppliers and distributors, will
              not be liable for any loss or damage that is not reasonably
              foreseeable.
            </p>
            <p>
              We recognize that in some countries, you might have legal rights
              as a consumer. If you are using the Platform for a personal
              purpose, then nothing in these terms or any additional terms
              limits any consumer legal rights which may not be waived by
              contract.
            </p>
            <Header as="h4">Business uses of our Platform</Header>
            <p>
              If you are using our Platform on behalf of a business, that
              business accepts these terms. It will hold harmless and indemnify
              Utterzone and its affiliates, officers, agents, and employees from
              any claim, suit or action arising from or related to the use of
              the Platform or violation of these terms, including any liability
              or expense arising from claims, losses, damages, suits, judgments,
              litigation costs and attorneys’ fees.
            </p>
            <Header as="h4">About these Terms</Header>
            <p>
              We may modify these terms or any additional terms that apply to a
              Service to, for example, reflect changes to the law or changes to
              our Platform. You should look at the terms regularly. We’ll post
              notice of modifications to these terms on this page. We’ll post
              notice of modified additional terms in the applicable Service.
              Changes will not apply retroactively and will become effective no
              sooner than fourteen days after they are posted. However, changes
              addressing new functions for a Service or changes made for legal
              reasons will be effective immediately. If you do not agree to the
              modified terms for a Service, you should discontinue your use of
              that Service.
            </p>
            <p>
              If there is a conflict between these terms and the additional
              terms, the additional terms will control for that conflict.
            </p>
            <p>These terms control the relationship</p>
            between Utterzone and you. They do not create any third party
            beneficiary rights.
            <p>
              If you do not comply with these terms, and we don’t take action
              right away, this doesn’t mean that we are giving up any rights
              that we may have (such as taking action in the future).
            </p>
            <p>If it turns out that a particular term is not enforceable,</p>
            this will not affect any other terms.
            <p>
              {" "}
              The courts in some countries will not apply our state law to some
              types of disputes. If you reside in one of those countries, then
              where our state law is excluded from applying, your country’s laws
              will apply to such disputes related to these terms. Otherwise, you
              agree that the laws of the state where Utterzone presides in will
              apply to any disputes arising out of or relating to these terms or
              the Platform. Similarly, if the courts in your country will not
              permit you to consent to the jurisdiction and venue of the courts
              in the state where Utterzone presides in then your local
              jurisdiction and venue will apply to such disputes related to
              these terms. Otherwise, all claims arising out of or relating to
              these terms or the services will be litigated exclusively in the
              federal or state courts where Utterzone presides in and you and
              Utterzone consent to personal jurisdiction in those courts.
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>
            I have read the terms and conditions
            <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
