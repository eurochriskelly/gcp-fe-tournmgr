import React, { useState, useEffect } from "react";
import { TabMenu } from 'primereact/tabmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ITournament, IFixture } from "gcp-core/types";
import TournamentOrganize from "gcp-core/src/TournamentOrganize.class";

import styles from "./TournamentDetail.module.scss";

interface Params {
    category: string;
    data: ITournament;
}

const TournamentDetail = ({
    category,
    data
}: Params) => {
    const [activities, setActivities] = useState<IFixture[]>([]);
    const [numToShow, setNumToShow] = useState(5);
    const organizer = new TournamentOrganize(data);
    useEffect(() => {   
       console.log(' w do ') 
        organizer.generate();
        setActivities(organizer.activities);
    }, []);
    return (
        <div className="card" >
            <button
                className="p-button p-button-rounded p-button-text"
                onClick={() => {
                    console.log('Generate');
                    console.log('num activites', activities?.length)
                    const activities = activities?
                        .sort((a: IFixture, b: IFixture) => a.ref > b.ref ? 1 : b.ref > a.ref ? -1 : 0)
                        .filter((x: IFixture) => x.category === category)
                        .slice(0, numToShow);
                    console.log(activities)
                    console.log(activities.slice(-1))
                    setNumToShow(numToShow + 1);
                    console.log(activities)
                    setActivities(activities)
                }}>Generate</button>
            <TabMenu activeIndex={1} model={[
                { label: 'Groups', icon: 'pi pi-fw pi-users' },
                { label: 'Fixtures', icon: 'pi pi-fw pi-calendar' },
                { label: 'Brackets', icon: 'pi pi-fw pi-share-alt' },
                { label: 'Results', icon: 'pi pi-fw pi-trophy' },
            ]} />
            {!!category && (
                <div className={styles.activities}>
                    <h1>CATEGORY: {category}</h1>
                    <div className="card">
                        <DataTable value={activities} className="p-datatable-sm">
                            <Column field="ref" header="#" />
                            <Column field="scheduledTime" header="Time" body={ScheduledTime} />
                            <Column field="pitch" header="Pitch" />
                            <Column field="team1" header="Team 1" body={TeamIconified.bind(null, 1)} />
                            <Column field="score1" header="Score" body={ShowScore.bind(null, 1)} />
                            <Column field="stage" header="stage" body={StageView} />
                            <Column field="score2" header="Score" body={ShowScore.bind(null, 2)} />
                            <Column field="team2" header="Team 2" body={TeamIconified.bind(null, 2)} />
                        </DataTable>
                    </div>
                </div>
            )}
        </div>
    );
};

const TeamIconified = (n: number, fixture: IFixture) => {
    return <div className={styles.tdTeam}>
        <div className={`teamName {}`}>{fixture[`team${n}`]}</div>
    </div>
}

const ScheduledTime = (fixture: IFixture) => {
    return <div>{new Date(fixture.scheduledTime).toISOString().split('T').pop()?.substring(0, 5)}</div>
}

const StageView = (fixture: IFixture) => {
    return <div className={styles.tdStage}>{fixture.stage}</div>
}

const ShowScore = (n: number, fixture: IFixture) => {
    const score = fixture[`score${n}`];
    const { goals, points } = score;
    const pointsStr = points ? points.toString().padStart(2, '0') : '00';
    // total points is goals*3 + points and must be displayed in brackets as 2 digits
    // if points is null, it should be displayed as 00
    let totalPoints = goals * 3 + points;
    totalPoints = totalPoints.toString().padStart(2, '00');
    if (goals || points) {
        return <div className={`${styles.aScore} `}>
            <div className="played">
                <div>
                    <span>{goals || 0}</span>
                    <span>  - </span>
                    {/* points should ways be displayed as 2 digits */}
                    <span>{pointsStr}</span>
                </div>
                <div>({totalPoints})</div>
            </div>
        </div>
    }
    return <div className={styles.aScore}>
        <div className="unplayed">
            <div>?-??</div>
            <div>(??)</div>
        </div>
    </div>
}


export default TournamentDetail;



function hoistMockActivities(id: number = 1) {
    const fixutres: IFixture[][] = [
        [
            {
                matchId: 1,
                scheduledTime: "2021-10-01T10:00:00",
                pitch: "Pitch 1",
                category: 'Mens',
                stage: 'group',
                position: 3,
                time: {
                    halfDuration: 10,
                    breakDuration: 5,
                    minRest: 5,
                    allotted: 30,
                },
                team1: "Team 1",
                score1: {
                    goals: 1,
                    points: 3
                },
                team2: "Team 2",
                score2: {
                    goals: 3,
                    points: 7,
                },
            },
            {
                matchId: 2,
                scheduledTime: "2021-10-01T10:30:00",
                pitch: "Pitch 1",
                category: 'Ladies',
                stage: 'group',
                position: 2,
                time: {
                    halfDuration: 10,
                    breakDuration: 5,
                    minRest: 5,
                    allotted: 30,
                },
                team1: "Cranberries",
                score1: {
                    goals: null,
                    points: null,
                },
                team2: "Carlton Athletic",
                score2: {
                    goals: null,
                    points: null,
                },
            },
        ], [

        ]
    ]

    return fixutres[id];
}