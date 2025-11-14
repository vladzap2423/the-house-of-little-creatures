'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Title, Text, Card } from '@telegram-apps/telegram-ui';

export default function DebugPage() {
    const lp = useLaunchParams();

    return (
        <main style={{ padding: 16 }}>
            <Title level="1">Debug Info</Title>

            <Card style={{ marginTop: 16, padding: 16 }}>
                <Text weight="2">tgWebAppDataRaw:</Text>
                <pre>{JSON.stringify(lp.tgWebAppDataRaw, null, 2)}</pre>

                <Text weight="2">tgWebAppData:</Text>
                <pre>{JSON.stringify(lp.tgWebAppData, null, 2)}</pre>

                <Text weight="2">Launch Params:</Text>
                <pre>{JSON.stringify(lp, null, 2)}</pre>
            </Card>
        </main>
    );
}
