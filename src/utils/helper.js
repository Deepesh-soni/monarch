import { client } from "@axiosClient";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";

import { BASE_URL, URL } from "@constants/urls";
import { MixpanelTracker } from "./mixpanelInstance";

//handle images upload and delete to cdn
const changeFileName = (file, fileName) => {
  const extension = file.name.split(".").pop(); // Get the file extension
  const modifiedFileName = fileName ? `${fileName}.${extension}` : file.name;
  const newFilename = modifiedFileName.replace(/\s+/g, "");

  return new File([file], newFilename, { type: file.type });
};

export const uploadImage = async (file, storeId, fileName = "", folder) => {
  if (!file) return;
  try {
    const image = changeFileName(file, fileName);

    const res = await client.post(
      `${BASE_URL}${URL.uploadAllImage}`,
      {
        image,
        //not needed when uploading directly for particular storeId
        // folderName: folder,
        storeId: storeId,
      },
      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );

    return res?.data?.imageUrl;
  } catch (error) {
    Bugsnag.notify(error);
  }
};

const updateStoreImagesData = async (storeImages, storeId, setStoreImages) => {
  if (!storeId) return;
  try {
    const response = await client.patch(URL.updateStore, {
      storeImages,
      storeId,
    });
    setStoreImages(response?.data?.data?.storeImages);
  } catch (error) {
    toast.error("Failed to update");
    Bugsnag.notify(error);
  }
};

export const deleteImage = async (
  imageUrl,
  storeImages,
  boolUpdateValue = false,
  setStoreImages,
  errorMsg = "Error in deleting file"
) => {
  try {
    if (!imageUrl) return;
    const trimmedUrl = imageUrl.replace(
      /^https:\/\/assets-pamprazzi\.b-cdn\.net\store\//,
      ""
    );
    const parts = trimmedUrl.split("/");
    const fileName = parts.pop();
    const storeId = parts.pop();
    await client.post(`${BASE_URL}${URL.deleteImage}`, {
      fileName,
      storeId,
    });
    if (boolUpdateValue) {
      updateStoreImagesData(storeImages, storeId, setStoreImages);
    }
    toast.success("File deleted successfully");
  } catch (error) {
    Bugsnag.notify(error);
    toast.error(errorMsg);
  }
};

//track
export const trackEvent = async (event, payload) => {
  const blockAnalytics = localStorage.getItem("block_analytics");
  const skipAnalytics = localStorage.getItem("skip_analytics");

  if (blockAnalytics === "true" || skipAnalytics === "true") return;

  const updatedPayload = { ...payload };

  const growthbookDeviceId = localStorage.getItem("deviceId");
  if (growthbookDeviceId) {
    updatedPayload.growthbook_device_id = growthbookDeviceId;
  }

  MixpanelTracker.getInstance().trackEvent({ event, payload: updatedPayload });
};

//random custom Coupons

export const randomCustomCoupons = (storeName) => { 
  const storeCode = storeName.slice(0, 3).toUpperCase();

  //fixed
  const fixedPart = 'PAM';

  const today = new Date();
  const date = String(today.getDate()).padStart(2, '0');

  const couponCode = `${storeCode}${fixedPart}${date}`;

  return couponCode;
}
