import React, { useEffect, useState } from "react";
import './index.less';
import { IoEllipse, IoEllipsisVertical, IoTime } from "react-icons/io5";
import moment from "moment";
import { FaEllipsisH, FaLink, FaPaperclip } from "react-icons/fa";
import { Button } from "antd";

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

    }

    return (
        <div className = "submissionPreviewCard">
            <span className = "submissionCardHeader">
                
                <span style = {{display: "inline-flex"}}>
                  <p className = "submissionStatus" 
                    style={{backgroundColor:  status == "uploading" ? "rgb(18, 113, 255)" : 
                                              status == "unverified" ?  "rgb(241, 160, 38)" : 
                                              status == "verified" ?  "rgb(120, 196, 60)": "rgb(231, 56, 17)",
                        
                          }}
                  >{status}</p>
                    <span  style={{display: "inline-flex", alignItems: "center"}}>
                      <IoTime size = {20} />
                      <p className = "submissionTimeStamp">
                        {moment(data.entry.date).fromNow()}
                      </p>
                    </span>
                </span>
                <Button 
                  type="link" 
                  icon = {<FaEllipsisH className = "submissionModalButton" size = {20} onClick={() => openModal()} />}/>

            </span>
            
            <h3 className = "submissionUserName">{data.entry.tags.split(',')[0]}</h3>
            <p className ="submissionDescription">{data.entry.description}</p>
            <span className = "submissionFileRow">
                <FaLink  size = {20} style ={{marginRight: "1rem"}}/>
                <p>bot.targz</p>
                {/* <p>{data.entry.fileLocation}</p> */}
            </span>
        </div>
    );
}

export default SubmissionEntryCard;