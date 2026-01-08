import { config } from '@/lib/config';

export function PolicyModalContent() {
    return (
        <div className="space-y-4 text-sm text-muted-foreground py-4">
            <p>{config.modals.policy.text}</p>
        </div>
    );
}
