export async function AndroidNativeShare(Title, URL, Description) {
  if (typeof navigator.share === "undefined" || !navigator.share) {
    alert("Your browser does not support Android Native Share");
  } else {
    const TitleConst = Title;
    const URLConst = URL;
    const DescriptionConst = Description;

    try {
      await navigator.share({
        title: TitleConst,
        text: DescriptionConst,
        url: URLConst,
      });
    } catch (error) {
      console.log("Error sharing: " + error);
      return;
    }
  }
}

$(".share_button").click(function () {
  AndroidNativeShare(
    "My Page Title",
    "https://google.com",
    "This is description"
  );
});
