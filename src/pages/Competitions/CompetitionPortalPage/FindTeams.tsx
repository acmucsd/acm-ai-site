import React, { useState, useEffect } from "react";
import { Content } from 'antd/lib/layout/layout';
import { AutoComplete, Input, List } from 'antd';
import { IoSearch } from "react-icons/io5";
import { User } from "../../../UserContext";
import TeamCard from '../../../components/TeamCard/index';
import "./index.less";

interface FindTeamsTabProps {
    data: Object[];
    user: User;
    compUser: any;
    registered: Boolean;
    fetchTeamsCallback: () => void;
    updateRankings: () => void;
}

/**
 * Renders the tab to view all available teams to join or leave
 * 
 * @param {any} data Holds the array of all teams
 * @param {User} user 
 * @param {any} compUser The competition user
 * @param fetchTeamsCallback Function that refetches all team data
 * @param updateRankings Function that retreives the new rankings of teams
 * 
 */
const FindTeamsTab: React.FC<FindTeamsTabProps>= (
    { data, user, compUser, registered, fetchTeamsCallback, updateRankings }:
    { data: Object[], user: User, compUser: any, registered: Boolean, fetchTeamsCallback: () => void, updateRankings: () => void }
) => {

    // Constants to align the pagination options for the teams list
    const [position] = useState<('top' | 'bottom' | 'both')>('bottom');
    const [align] = useState<'start' | 'center' | 'end'>('center');

    // Dropdown options for search bar
    const [options, setOptions] = useState<Array<Object>>(data);

    // Initialize the teams data once that data defined
    useEffect(() => {
        if (data) {
            setOptions(data);
        }
    }, [data, registered])

    const handleSearch = (value: string) => {
        // Resets search options back to the original data if the value is an empty string
        if (value === "") {
            setOptions(data);
        }
    }

    const handleSelect = (value: string) => {

        // Filter the list items
        const filteredOptions = data.filter((item: any) =>
            item.teamName.toUpperCase().includes(value.toUpperCase())
        );
        setOptions(filteredOptions)
    }

    return (
        <Content id="findTeamsContainer">
            <AutoComplete
                id="teamSearchBar"
                onSearch={(text) => handleSearch(text)}
                onSelect={handleSelect}

                // list of all possible options for dropdown
                options={options.map((item: any) => ({ value: item.teamName }))}

                // filterOption to handle filtered dropdown items 
                filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                size="large"
                style={{ width: "100%" }}
            >
                <Input allowClear bordered ={false} prefix={<IoSearch size = {20} id = "searchIcon" style = {{marginRight: "0.5rem", color: "lightgrey"}} />}  size="large" placeholder="Look up a team name"  />
            </AutoComplete>

            {/** List to preview all the teams based on the user's query */}
            <List
                split={false}
                pagination={{ position, align, pageSize: 6 }}
                dataSource={options}
                renderItem={(team: any) => (
                    <List.Item key={team.competitionName}>
                        {<TeamCard team={team} user={user} compUser={compUser} fetchTeamCallback={fetchTeamsCallback} updateRankings={updateRankings} />}
                    </List.Item>
                )}
            />

        </Content>
    );
};

export default FindTeamsTab;