import React, { useEffect, useState } from "react";
import './index.less';
import { IoEllipse, IoEllipsisVertical, IoPerson, IoTime } from "react-icons/io5";
import moment from "moment";
import { FaEllipsisH, FaLink, FaPaperclip } from "react-icons/fa";
import { Button, Modal } from "antd";
import { TeamMemberAvatar } from "../../CompetitionPortalPage";
import { BsQuestion, BsQuestionLg } from "react-icons/bs";
import { BiStats } from "react-icons/bi";

// export interface competitionEntry {
//     _id: mongoose.Types.ObjectId,
//     competitionTeam: mongoose.Types.ObjectId;
//     competitionName: string;
//     status: submitStates;
//     description: string;
//     tags: string[];
//     fileLocation: string;
//     score: number;
//     trueScore: number;
//     rank: Object;
//     submissionDate: Date;
//     error: string;
//   }

const SubmissionEntryCard = (data: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(data.entry)
  }, [])
    let status = '?';
    switch (data.entry.status) {
        case 0:
          status = 'uploading';
          break;
        case 1:
          status = 'unverified';
          break;
        case 2:
          status = 'verified';
          break;
        case 3:
          status = 'failed';
          break;
    }

    function openModal() {
      setIsModalOpen(true);
    }

    return (
      <>
        <Modal
          width={850}
          footer = {null}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          open = {isModalOpen}
          title = {<p style = {{color: "gray"}}>submission</p>} 
          centered
          className="submissionModal"
        >
          <section className="submissionModalHeader">

            <span style={{display: "inline-flex", alignItems: "center", justifyContent: "space-between", width: "fit-content"}}>
              <h3 style={{fontWeight: 850}}>{data.entry.dateString}</h3>
              <span className = "submissionTimeStamp">
                <IoTime size = {20} />
                <p >
                  {moment(data.entry.date).fromNow()}
                </p>
              </span>
            </span>
          
          </section>

          <section className = "submissionDetailsSection">

            <div className = "submissionDetailsRow">
              <span>
                <div>
                  <FaLink className = "submissionDetailsIcon" size = {14} />
                </div>
                <p>File</p>
              </span>
              <p></p>
            </div>

            <div className = "submissionDetailsRow">
              <span>
                <div>
                  <IoPerson className = "submissionDetailsIcon" size = {16}   />
                </div>
                <p>Uploader</p>
              </span>
              
              <span>
                <TeamMemberAvatar username={data.entry.tags.split(',')[0]}/>
                <p>{data.entry.tags.split(',')[0]}</p>
              </span>
            
            </div>

            <div className = "submissionDetailsRow">
              <span>
                <div>
                  <BsQuestionLg className = "submissionDetailsIcon" size = {20} />
                </div>
                <p>Status</p>
              </span>
              <p className = "submissionStatus" 
                    style={{backgroundColor:  status == "uploading" ? "rgb(18, 113, 255)" : 
                                              status == "unverified" ?  "rgb(241, 160, 38)" : 
                                              status == "verified" ?  "rgb(120, 196, 60)": "rgb(231, 56, 17)",
                        
                          }}
                  >{status}</p>
            </div>


            <div className = "submissionDetailsRow">
              <span>
              <div>
                  <BiStats className = "submissionDetailsIcon" size = {20} />
                </div>
                <p>Score</p>
              </span>
              <p>submission score</p>
            </div>
          </section>


          <section className = "submissionDescriptionSection">
            <h4>Description</h4>
            <p>{data.entry.description}</p>
          </section>

          <section className = "submissionErrorLogsSection">
            <h4>Error Logs</h4>
            <hr/>
            <p>{data.entry.description}</p>
          </section>
        </Modal>



        <div className = "submissionPreviewCard">
            <span className = "submissionCardHeader">
                
                <span style = {{display: "inline-flex"}}>
                  <p className = "submissionStatus" 
                    style={{backgroundColor:  status == "uploading" ? "rgb(18, 113, 255)" : 
                                              status == "unverified" ?  "rgb(241, 160, 38)" : 
                                              status == "verified" ?  "rgb(120, 196, 60)": "rgb(231, 56, 17)",
                        
                          }}
                  >{status}</p>
                    <span  className = "submissionTimeStamp">
                      <IoTime size = {20} />
                      <p>
                        {moment(data.entry.date).fromNow()}
                      </p>
                    </span>
                </span>
                <Button 
                  type="link" 
                  icon = {<FaEllipsisH className = "submissionModalButton" size = {20} style ={{color: "black"}} onClick={() => openModal()} />}/>

            </span>
            <span  style={{display: "inline-flex", alignItems: "center", marginTop:"2rem"}}>
              <TeamMemberAvatar username={data.entry.tags.split(',')[0]} />
              <h3 className = "submissionUserName">{data.entry.tags.split(',')[0]}</h3>

            </span>

            <p className ="submissionDescription">{data.entry.description}</p>
            <span className = "submissionFileRow">
                <FaLink  size = {20} style ={{marginRight: "1rem"}}/>
                <p>bot.targz</p>
                {/* <p>{data.entry.fileLocation}</p> */}
            </span>
        </div>
      </>
    );
}

export default SubmissionEntryCard;