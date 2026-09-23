import { google } from 'googleapis';

// Static service account credentials
const credentials = {
    type: "service_account",
    project_id: "weddingdrive-509510",
    private_key_id: "30218a83428a76912b92e8f18a1c18e53ca47ad3",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKRy1obPTYHp27\nz4+c9yZ9Jhmte4etSoq1oeLB7/NPUdRhSOsMG/7cpCcW1v2thBzgQbxNzfAsTRza\nIj7pnzbMJpLWatDlEVkoRxJK1fGLOjesPmmxsw4NGOiZeBKitHq7nbIBfNM7Bkxi\ne5AfPnBvLxyqHYBuD2hMX0neFInwPKw0tLv0nvCieTFUUshdupZsXTAV8ju7Mt4C\nB78lhhUefS5sBkzqWcLR0FbBUwLnsZrTPE5XQ5AdwRQj7Mae4lO6BjjAWrCP8Mk2\ngVduTPTt24JEIA8zl5Sq8AyKXGDMtmTeBSoFF1mVWMoZwvANbghg5qTW24OmvyAZ\nal1oB+njAgMBAAECggEAEG96HAsGVe0e6dyykZFvWinXWkY4PvdYj+uIbjOd9Gr0\ns7bmCkTYD3tzBaMQV6HtardMopHCGwdk+cBglkDuheX4dl2VfZdMRD6KGPSLPMHN\nNjyX/+1JjfzhIV8lPH0nn8jvZrmKvDgFyta5XiCHqDEOxi/BeK/dzJ7NdLL8hj1y\ns3PgIu/eFhAken9XdCHZAMp/gnksw9nnZj+s+u1Yb63Edav+orvbxA97AmkwAtPm\nOAN0kh8qXCL0AqVqdve64XjH9mNROphBiu5Ps0pCYW0/MolAmkW1KLLobjOaY+Wk\nrE9hd+KQkjx/fzyxVbIk7CumaEkJLzFJSUfQlPLu4QKBgQD2giNib71KB2F4fCd1\nkUqohgX4gOPq3GKr0rLRz4GAxXwcj8CdIe/g0Hs1gpGAcJ+2iKEe7VSW2Q/RjBU9\nfvOKu10pJSgc/ZbLayGgGcyLLpCKFDW2+XLxI5Obo9+AMbi2BCK4kNeDttFoEKpf\nmWXCIRT7R5p032meZg4z8+NtsQKBgQDSEQ5EwncpzmC43JnNall4whFlyKfbOrNj\nEef6VdumbDl0iZv3edXJlkHlfjShFpZicdnlKHfFt5/+fW2e7rHI/C0/JPenn4yD\nAGhjK3KJAts2gMGR/PoGA99X5WFl5MjefuyAZIb29FoDSs42cB1+bxjuEdpYwVme\nOuEABjfR0wKBgQDZTxQ+fN7T2fnVKy3l+LVmJvAwh/9kVfAuJMo7J8C0cmPdEeTt\nILPE7kUPgREftyk00vGmv/XoHWZShjlbQwUTceTIltbr56n9nW3BI70rnVsSPoqz\nyOfJKGHBvQ8UhcCdxLuPFTDIDmxAXyCyshoArwU+F3tUOHd1ieZPals9oQKBgQCW\nrBMe8JkGTHgFwH004GYifph5+C2lynnmwm4wmaq9uPyRAS70l9fnCrZjRF29eXUO\nUXknrBoUn/vLTu30xGKStYZCt2JHQeJICF/XWc+CRKE1e67b5qby744f/nAY5LvL\nEyDRislfkq6Jk/tLAqm1CTzJbda+OJjuLG88VDlvbwKBgHiL0FONR5ONoqAs1ZAx\nGIwzCFqnDdJxLJpFv8aPZHy6Mya1JXVF++u24g3Ok7LFVH1SZHf8OoaBWUUK5oTC\nXobaWUqJZBTSe+YyOulyMLRATTxw7PQQYtXsaFEI2Cmg3g9uUZGIoEL5p/9xQ8m9\nCButoLkIHoUyJqItjavPHt8M\n-----END PRIVATE KEY-----\n",
    client_email: "wedding-drive-fetcher@weddingdrive-509510.iam.gserviceaccount.com",
    client_id: "106303884679867132189",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/wedding-drive-fetcher%40weddingdrive-509510.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

export const drive = google.drive({ version: 'v3', auth });

/**
 * Recursive Google Drive photo fetcher
 */
export async function fetchFolderContents(folderId, folderName) {
    const filesRes = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id, name, webViewLink, thumbnailLink)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
    });
    const photos = filesRes.data.files || [];

    const foldersRes = await drive.files.list({
        q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: 'files(id, name)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
    });
    const childFolders = foldersRes.data.files || [];

    const subfolders = [];
    for (const child of childFolders) {
        const result = await fetchFolderContents(child.id, child.name);
        if (result) {
            subfolders.push(result);
        }
    }

    if (photos.length === 0 && subfolders.length === 0) {
        return null;
    }

    const folderObj = { id: folderId, name: folderName };
    if (photos.length > 0) folderObj.photos = photos;
    if (subfolders.length > 0) folderObj.subfolders = subfolders;

    return folderObj;
}