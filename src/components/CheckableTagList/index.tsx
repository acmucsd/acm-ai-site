import React, { useState } from 'react';

import { Tag } from 'antd';

import './index.less'

const { CheckableTag } = Tag;

const CheckableTagList = ({ tags, tagsChecked, setTagsChecked }: { tags: string[], tagsChecked: boolean[], setTagsChecked: Function }) => {

    // const [tagsChecked, setTagsChecked] = useState<any>(Array(tags.length).fill(false))

    const handleCheck = (i: number) => {

        let temp = []
        temp.push(...tagsChecked)
        temp[i] = !temp[i]
        setTagsChecked(temp)
    }

    return (
        <div className="CheckedTagList">
            {tags.map((tag, i) => {
                return (
                    <CheckableTag
                        className='tag'
                        checked={tagsChecked[i]} 
                        key={tag + 'CheckableTag'} 
                        onChange={() => handleCheck(i)}
                    >
                        {tag}
                    </CheckableTag>
                );
            })}
        </div>
    )
}
export default CheckableTagList;
