import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { usePostRecipeMutation } from '../features/recipe/recipeApi';
import PostRecipeForm from '../shared/PostRecipeForm';

export default function PostRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        img: null,
        imgTitle: '',
        ingredients: [],
        region: '',
        method: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { _id: chefId } = useSelector((state) => state.user);

    // RTK mutations
    const [
        postRecipe,
        {
            isLoading: postRecipeIsLoading,
            isSuccess: postRecipeIsSuccess,
            error: postRecipeError,
        },
    ] = usePostRecipeMutation();

    // Handle editRecipe mutation success
    useEffect(() => {
        if (postRecipeIsSuccess) {
            navigate('/profile/chef/dashboard/recipes');
        }
    }, [navigate, postRecipeIsSuccess]);

    // Handle editRecipe mutation error
    useEffect(() => {
        if (postRecipeError?.data?.message) {
            setError(postRecipeError?.data?.message);
        }
    }, [postRecipeError?.data?.message]);

    // Handle form submission
    const handleSubmitForm = () => {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('region', formData.region);
        formDataToSend.append('method', formData.method);
        formDataToSend.append('recipe-image', formData.img);
        formDataToSend.append(
            'ingredients',
            JSON.stringify(formData.ingredients)
        );

        if (formData.imgTitle) {
            formDataToSend.append('imgTitle', formData.imgTitle);
        }

        postRecipe({ chefId, data: formDataToSend });
    };

    return (
        <>
            <Helmet>
                <title>Post Recipe - Mad Chef</title>
            </Helmet>

            <PostRecipeForm
                formData={formData}
                setFormData={setFormData}
                error={error}
                setError={setError}
                loading={postRecipeIsLoading}
                handleSubmitForm={handleSubmitForm}
            />
        </>
    );
}
