const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

document.querySelectorAll("[data-resume-download]").forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(link.href);

      if (!response.ok) {
        throw new Error("Resume download failed");
      }

      const fileBuffer = await response.arrayBuffer();
      const blob = new Blob([fileBuffer], { type: "application/octet-stream" });
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = blobUrl;
      downloadLink.download = link.getAttribute("download") || link.href.split("/").pop();
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch {
      window.location.href = link.href;
    }
  });
});

year.textContent = new Date().getFullYear();
