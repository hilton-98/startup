import React from 'react';

import { MySchools } from './mySchools';
import { Messages } from './messages';


export function HomeContent() {
    return (
        <section className="content">
            <MySchools />
            <Messages />
        </section>
    );
}