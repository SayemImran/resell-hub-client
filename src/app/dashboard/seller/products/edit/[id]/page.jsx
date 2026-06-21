import React from 'react';

const EditPage = async ({params}) => {
    const {id} = await params;
    return (
        <div>
            this is the edit page of product id : {id}
        </div>
    );
};

export default EditPage;