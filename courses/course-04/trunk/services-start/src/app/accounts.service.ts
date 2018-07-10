export class AccountService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    addAccount(n: string, s: string) {
        this.accounts.push({name: n, status: s});
    }

    updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    }
}
