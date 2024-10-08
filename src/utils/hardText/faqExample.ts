export const faqData = {
  status: "success",
  message: "FAQ - Website Content",
  code: 200,
  data: {
    id: 1,
    name: "FAQ",
    language_name: "FAQ",
    language_alignment: "left",
    content: {
      faqPageData: {
        heading: [
          {
            text: "Frequently asked questions (FAQs)",
            img: null,
            link: null,
          },
        ],
        arrows: [
          {
            name: "arrow-down",
            text: null,
            img: "http://dev.niyamitnivesh.in/static/media/arrow-open.20465aed60723fd8234e938eeb92d55b.svg",
            link: null,
          },
          {
            name: "arrow-up",
            text: null,
            img: "http://dev.niyamitnivesh.in/static/media/arrow-close.d169580922fbb6e6c171af5bdcd2848e.svg",
            link: null,
          },
        ],
        questionSections: [
          {
            subHeading: [
              {
                text: "A) About CKYC",
                img: null,
                link: null,
              },
            ],
            questions: [
              {
                question: "a1. What is Central KYC Registry?",
                answer:
                  "Central KYC Registry is a centralized repository of KYC records of customers in the financial sector with uniform KYC norms and inter-usability of the KYC records across the sector with an objective to reduce the burden of producing KYC documents and getting those verified every time when the customer creates a new relationship with a financial entity.",
              },
              {
                question:
                  "What are the salient features of Central KYC Registry?",
                answer: "Central KYC Registry has the below salient features:",
              },
              {
                question: "Who can get access to Central KYC application?",
                answer:
                  "Central KYC application can be accessed by authorised institutions or other notified institutions under the Prevention of Money Laundering Act or rules framed by the Government of India or any Regulator (RBI, SEBI, IRDA, and PFRDA) there under.",
              },
              {
                question:
                  "Which entities are required to upload / search / download / update KYC records as per the Prevention of Money Laundering Act (PMLA)?",
                answer:
                  "The PMLA states as per rule (9) (I) (1): Subject to the provisions of sub-rule (1) of the Prevention of Money-laundering Act, 2002, every reporting entity shall within three days after the commencement of an account-based relationship with a client, file the electronic copy of the client´s KYC records with the Central KYC Records Registry.",
              },
            ],
          },
          {
            subHeading: [
              {
                text: "B) Reporting Entity Registration",
                img: null,
                link: null,
              },
            ],
            questions: [
              {
                question:
                  "What is the process for a financial institution to get registered with Central KYC Registry for registration references from 100000 onwards?",
                answer:
                  "Please register on the test environment testbed.ckycindia.in and test the application. Admin 1 & 2 shall receive testbed login credentials within 24 working hours for testing purpose",
              },
              {
                question:
                  "What is the process for a financial institution to get registered with Central KYC Registry for registration references from 300000 onwards?",
                answer:
                  "Financial Institutions (FI) have to register at https://www.ckycindia.in/admin/FIRegistration.action?parameter=START",
              },
              {
                question:
                  "What is the process for modifying or changing the institution details and admin / nodal officer details in the CKYC system before registration is complete.",
                answer:
                  "The nodal officer has to send a mail to helpdesk@ckycindia.in quoting their registration reference number requesting CKYC to place their registration on hold. Once the institution is placed on hold a link to the online registration form will be sent to the nodal officer. After making the necessary changes the nodal officer has to resubmit the form online. The revised application form will have to be sent to CERSAI along with supporting documents, if necessary.",
              },
              {
                question:
                  "What is the process for modifying or changing the institution details and admin / nodal officer details in the CKYC system after registration is completed.",
                answer:
                  "An active Institutional admin (IA) can use ‘Institution Admin Request’ option under User Management to initiate a change request with CERSAI to deactivate an existing IA and create a new IA in their place. You may also initiate requests to update IA details using this functionality. Download the prefilled request form by clicking on the “Download request letter”. Send the duly signed request form and documents as per the checklist on the request form to CERSAI, Delhi. Upon CERSAI’s approval, the service request will be executed and completed.",
              },
            ],
          },
          {
            subHeading: [
              {
                text: "C) Connectivity queries",
                img: null,
                link: null,
              },
            ],
            questions: [
              {
                question:
                  "What kind of infrastructure would be required at the financial institution for accessing Central KYC application?",
                answer:
                  "There needs to be internet connectivity with bandwidth of minimum 512 kbps and a scanner with the stipulated specifications.",
              },
              {
                question:
                  "How can we connect to CKYC system after registration?",
                answer:
                  "Please refer connectivity guidelines in download section https://www.ckycindia.in/ckyc/assets/doc/Connectivity-Guidelines-2.pdf",
              },
              {
                question:
                  "c3. What are different channels for Search, Upload, Download and Update?",
                answer:
                  "Webpage based Search, Upload, Download and Update of records, SFTP bulk upload for Search, Upload, Download and Update of records. API service call for Search and Download of records. Details for the above three methods are provided in our user manual available under the Download Section in our website",
              },
            ],
          },
        ],
      },
    },
  },
};
