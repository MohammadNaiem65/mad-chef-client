import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import PostRecipeForm from '../shared/PostRecipeForm';
import {
    useEditRecipeMutation,
    useGetRecipeQuery,
} from '../features/recipe/recipeApi';
import { Error, Spinner } from '../shared';
import { Helmet } from 'react-helmet-async';

export default function EditRecipe() {
    const [formData, setFormData] = useState({
        title: '',
        img: null,
        imgId: '',
        imgTitle: '',
        author: '',
        ingredients: [],
        region: '',
        method: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { recipeId } = useParams();

    // RTK queries
    const {
        data,
        isLoading: getRecipeIsLoading,
        isSuccess: getRecipeIsSuccess,
        isError: getRecipeIsError,
        error: getRecipeError,
    } = useGetRecipeQuery({
        recipeId,
    });
    const [
        editRecipe,
        {
            isLoading: editRecipeIsLoading,
            isSuccess: editRecipeIsSuccess,
            error: editRecipeError,
        },
    ] = useEditRecipeMutation();

    // Update form data when recipe data changes
    useEffect(() => {
        if (getRecipeIsSuccess) {
            const {
                title,
                img,
                imgId,
                imgTitle,
                author,
                ingredients,
                region,
                method,
            } = data?.data || {};

            setFormData((prevData) => ({
                ...prevData,
                title: title || prevData.title,
                img: img || prevData.img,
                imgId: imgId || prevData.imgId,
                imgTitle: imgTitle || prevData.imgTitle,
                author: author || prevData.author,
                ingredients: ingredients || prevData.ingredients,
                region: region || prevData.region,
                method: method || prevData.method,
            }));
        }
    }, [getRecipeIsSuccess, data?.data]);

    // Handle editRecipe mutation error
    useEffect(() => {
        if (editRecipeError?.data?.message) {
            setError(editRecipeError?.data?.message);
        }
    }, [editRecipeError?.data?.message]);

    // Handle editRecipe mutation success
    useEffect(() => {
        if (editRecipeIsSuccess) {
            navigate(`/recipes/recipe/${recipeId}`);
        }
    }, [navigate, recipeId, editRecipeIsSuccess]);

    // Handle editRecipe mutation
    const handleEditRecipe = () => {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('region', formData.region);
        formDataToSend.append('method', formData.method);
        formDataToSend.append('recipe-image', formData.img);
        formDataToSend.append('imgTitle', formData.imgTitle);
        formDataToSend.append(
            'ingredients',
            JSON.stringify(formData.ingredients)
        );

        editRecipe({ recipeId, data: formDataToSend });
    };

    // Decide what to render
    let content;
    if (getRecipeIsLoading) {
        content = <Spinner />;
    } else if (!getRecipeIsLoading && getRecipeIsError) {
        content = <Error message={getRecipeError?.data?.message} />;
    } else if (!getRecipeIsLoading && !getRecipeIsError && getRecipeIsSuccess) {
        content = (
            <PostRecipeForm
                formData={formData}
                setFormData={setFormData}
                loading={editRecipeIsLoading}
                error={error}
                setError={setError}
                handleSubmitForm={handleEditRecipe}
            />
        );
    }

    return (
        <>
            <Helmet>
                <title>Edit Recipe - Mad Chef</title>
            </Helmet>

            {content}
        </>
    );
}
