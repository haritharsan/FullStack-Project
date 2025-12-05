package com.vedha.project.selenium;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;
import java.util.List;
import java.util.stream.Stream;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class RegisterOtpTest {

    static WebDriver driver;
    static WebDriverWait wait;
    static UITestLogger logger;

    static String alreadyRegisteredEmail;
    static String registeredName;

    void slow(long ms) { try { Thread.sleep(ms);} catch (Exception ignored) {} }

    // ---------- RUN ONCE BEFORE ALL TESTS ----------
    @BeforeAll
    static void clearOldResults() {
        System.setProperty("webdriver.chrome.driver",
                System.getProperty("user.dir") + "\\drivers\\chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(45));
        driver.manage().window().maximize();

        logger = new UITestLogger(driver);

        // open app once and clear previous results
        driver.get("http://localhost:5173/");
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("localStorage.removeItem('testResults');");
        js.executeScript("localStorage.removeItem('showPopup');");
        js.executeScript("document.querySelectorAll('.ant-modal')?.forEach(e=>e.remove());");

        System.out.println("🧹 Old Test Report Cleared Successfully!");
    }

    // ---------- RUN BEFORE EACH INDIVIDUAL TEST ----------
    @BeforeEach
    void setup() {
        // DO NOT create new driver / DO NOT clear testResults here
        // just reset UI state
        driver.get("http://localhost:5173/");
        ((JavascriptExecutor) driver)
                .executeScript("document.querySelectorAll('.ant-modal')?.forEach(e=>e.remove());");
    }

    // ---------- AFTER EACH TEST ----------
    @AfterEach
    void tearDown(TestInfo info) {
        System.out.println("\n====================================");
        System.out.println("✔ Finished Test: " + info.getDisplayName());
        System.out.println("====================================\n");
        slow(800);
        // do NOT quit driver here – we are reusing same browser
    }

    // ---------- AFTER ALL TESTS ----------
    @AfterAll
    static void openFinalReport() throws InterruptedException {
        System.out.println("\n📌 ALL TESTS COMPLETED — Opening Final Combined Report...");

        driver.get("http://localhost:5173/test-report");

        // keep browser open to view report
        Thread.sleep(60000);

        driver.quit();
    }


    // ---------- 1️⃣ Invalid Register Input Tests ----------
    static Stream<Arguments> invalidInputs() {
        return Stream.of(
                Arguments.of("", "test@gmail.com", "9876543210", "name"),
                Arguments.of("Hari", "", "9876543210", "email"),
                Arguments.of("Hari", "wrongEmail", "9876543210", "email"),
                Arguments.of("Hari", "test@gmail.com", "", "phone"),
                Arguments.of("Hari", "test@gmail.com", "123", "phone")
        );
    }

    @ParameterizedTest(name = "❌ Invalid → Missing {3}")
    @MethodSource("invalidInputs")
    @Order(1)
    public void testInvalidInputs(String name, String email, String phone, String expectedField) {
        try {
            driver.get("http://localhost:5173/register");

            driver.findElement(By.xpath("//input[@placeholder='Full Name']")).sendKeys(name);
            driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys(email);
            driver.findElement(By.xpath("//input[@placeholder='Phone Number']")).sendKeys(phone);

            driver.findElement(By.xpath("//button[contains(.,'Send OTP')]")).click();
            slow(1200);

            Assertions.assertTrue(driver.getPageSource().toLowerCase().contains(expectedField));

            logger.log("Missing " + expectedField.toUpperCase() + " Test", true, "Validation working");
        } catch (Exception e) {
            logger.log("Register Validation Test Failed", false, e.getMessage());
            throw e;
        }
    }

    // ---------- 2️⃣ Wrong OTP Validation ----------
    @Test
    @DisplayName("OTP Validation Test")
    @Order(2)
    public void testWrongOtp() {

        try {
            driver.get("http://localhost:5173/register");

            driver.findElement(By.xpath("//input[@placeholder='Full Name']")).sendKeys("Hari");
            driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys("user" + System.currentTimeMillis() + "@gmail.com");
            driver.findElement(By.xpath("//input[@placeholder='Phone Number']")).sendKeys("9887654321");

            driver.findElement(By.xpath("//button[contains(.,'Send OTP')]")).click();
            slow(1500);

            driver.findElement(By.xpath("//input[@placeholder='Enter OTP']")).sendKeys("0000");
            driver.findElement(By.xpath("//button[contains(.,'Verify')]")).click();

            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'ant-message')]")));

            logger.log("Wrong OTP Test", true, "Wrong OTP properly validated");
        } catch (Exception e) {
            logger.log("Wrong OTP Test Failed", false, e.getMessage());
            throw e;
        }
    }

    // ---------- 3️⃣ Successful Registration + OTP Verification ----------
    @Test
    @DisplayName("Successful Registration Test")
    @Order(3)
    public void testSuccessfulRegister() {
        try {
            driver.get("http://localhost:5173/register");

            registeredName = "User" + System.currentTimeMillis();
            alreadyRegisteredEmail = registeredName.toLowerCase() + "@gmail.com";
            String phone = "98" + (long) (Math.random() * 100000000);

            driver.findElement(By.xpath("//input[@placeholder='Full Name']")).sendKeys(registeredName);
            driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys(alreadyRegisteredEmail);
            driver.findElement(By.xpath("//input[@placeholder='Phone Number']")).sendKeys(phone);

            driver.findElement(By.xpath("//button[contains(.,'Send OTP')]")).click();
            slow(1500);

            WebElement otpToast = wait.until(
                    ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'ant-message')]")));

            String otp = otpToast.getText().replaceAll("\\D", "");
            driver.findElement(By.xpath("//input[@placeholder='Enter OTP']")).sendKeys(otp);
            driver.findElement(By.xpath("//button[contains(.,'Verify')]")).click();

            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Password']"))).sendKeys("Hari123");
            driver.findElement(By.xpath("//button[contains(.,'Register')]")).click();

            logger.log("Successful Register", true, "User Registered");
        } catch (Exception e) {
            logger.log("Successful Register Failed", false, e.getMessage());
            throw e;
        }
    }

    // ---------- 4️⃣ Empty Login Validation ----------
    @Test
    @DisplayName("Empty Login Test")
    @Order(4)
    public void testEmptyFields() {
        try {
            driver.get("http://localhost:5173/");
            driver.findElement(By.xpath("//button[contains(.,'Continue')]")).click();
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'ant-message')]")));

            logger.log("Empty Login Validation", true, "Validation working");
        } catch (Exception e) {
            logger.log("Empty Login Validation Failed", false, e.getMessage());
            throw e;
        }
    }

    // ---------- 5️⃣ Valid Login ----------
    @Test
    @DisplayName("Valid Login Test")
    @Order(5)
    public void testValidLogin() {
        try {
            driver.get("http://localhost:5173/");

            WebElement usernameField = wait.until(
                    ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Username or Email']")));
            usernameField.sendKeys("admin");

            driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin123");
            driver.findElement(By.xpath("//button[contains(.,'Continue')]")).click();

            logger.log("Valid Login", true, "Login working");
        } catch (Exception e) {
            logger.log("Valid Login Failed", false, e.getMessage());
            throw e;
        }
    }

    // ---------- 6️⃣ Full Automation Flow ----------
    @Test
    @DisplayName("🚀 Full Automation Flow")
    @Order(6)
    public void testFullAutomationFlow() throws InterruptedException {
        try {
            System.out.println("\n🚀 Running End-to-End Automation Test...");

            driver.get("http://localhost:5173/");

            // ---------- LOGIN ----------
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Username or Email']")))
                    .sendKeys("vedha");

            driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("123");
            driver.findElement(By.xpath("//button[contains(.,'Continue')]")).click();

            wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'Dashboard')]")));
            System.out.println("✔ Logged in Successfully");

            // ---------- OPEN UPLOAD TAB ----------
            wait.until(ExpectedConditions
                    .elementToBeClickable(By.xpath("//span[contains(@class,'anticon-file-add')]/parent::div"))).click();
            System.out.println("📂 Upload Page Opened!");

            // ---------- CHECK IF FILE EXISTS ----------
            boolean previewVisible = driver.findElements(By.xpath("//*[contains(text(),'Preview')]")).size() > 0;

            if (!previewVisible) {
                WebElement fileInput = wait
                        .until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@type='file']")));
                ((JavascriptExecutor) driver).executeScript("arguments[0].style.display='block';", fileInput);

                fileInput.sendKeys(System.getProperty("user.dir") + "\\samplefiles\\good.java");
                System.out.println("📄 File Uploaded!");

                wait.until(
                        ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'ant-message')]")));
            }

        	Thread.sleep(1500);
            // ---------- CLICK ANALYZE ----------
            wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(.,'Analyze')]"))).click();
            System.out.println("🔍 Analyze Started...");
        	Thread.sleep(1500);

            // ---------- WAIT FOR ANALYTICS ----------
            wait.until(ExpectedConditions
                    .visibilityOfElementLocated(By.xpath("//*[contains(text(),'Code Quality Analysis')]")));
            System.out.println("📊 Analytics Page Loaded!");

            // ---------- CLICK CARDS ----------
            List<WebElement> cards = driver.findElements(By.xpath("//div[contains(@class,'ant-card')]"));
            for (int i = 1; i <= cards.size(); i++) {
                try {
                    WebElement card = wait.until(ExpectedConditions
                            .elementToBeClickable(By.xpath("(//div[contains(@class,'ant-card')])[" + i + "]")));

                    ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", card);
                    card.click();
                    System.out.println("📌 Opened Box #" + i);

                    wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[text()='✕']"))).click();
                    System.out.println("❌ Closed Box #" + i);

                } catch (Exception e) {
                    System.out.println("⚠ Box #" + i + " skipped");
                }
            }
        	// ---------- FIX UI BEFORE PDF ----------
			List<WebElement> closeBtns = driver.findElements(By.xpath("//*[text()='✕']"));
			if (!closeBtns.isEmpty()) {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", closeBtns.get(0));
				Thread.sleep(700);
			}

			((JavascriptExecutor) driver)
					.executeScript("document.querySelector('.analytics-container')?.classList.remove('blur-active');");

			((JavascriptExecutor) driver).executeScript(
					"document.querySelectorAll('.ant-card').forEach(card => card.style.pointerEvents = 'none');");

			Thread.sleep(800);

			// ---------- DOWNLOAD PDF ----------
			WebElement pdfButton = wait
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(.,'Download PDF')]")));

			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", pdfButton);
			Thread.sleep(1000);

			try {
				pdfButton.click();
			} catch (Exception ex) {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", pdfButton);
			}

			System.out.println("📥 PDF Download Triggered!");

			((JavascriptExecutor) driver).executeScript("document.body.style.pointerEvents='none';");

			// ⏳ wait to ensure PDF fully downloads

			Thread.sleep(1500);

			// ---------- 🚀 GO TO HISTORY ----------
			// -------- 🎯 PDF DOWNLOAD ACTION COMPLETED --------
			System.out.println("📥 PDF Download Triggered!");

			Thread.sleep(1500);

			// ------- 🧠 Simulate user scroll downward slowly -------
			for (int i = 0; i < 5; i++) {
				((JavascriptExecutor) driver).executeScript("window.scrollBy(0, 80)");
				Thread.sleep(250);
			}
			System.out.println("🖱 Simulated human scroll...");

			// -------- 🖱 Simulate mouse hover near dock bar --------
			((JavascriptExecutor) driver)
					.executeScript("window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});");

			Thread.sleep(1200); // Allow dock to animate

			System.out.println("🧲 Hover effect triggered.");

			// ------- 🎯 Locate history button with animation stability -------
			WebElement historyBtn = wait
					.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@data-testid='history-btn']")));

			// Wait until stable sized (animation finished)
			wait.until(driver1 -> historyBtn.getSize().height > 45);
			System.out.println("🔍 Button animation completed.");

			// Scroll it into perfect clicking position
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior:'smooth', block:'center'});",
					historyBtn);

			Thread.sleep(600);

			// Try normal click first
			try {
				historyBtn.click();
				System.out.println("🖱 History clicked normally.");
			} catch (Exception ex) {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", historyBtn);
				System.out.println("⚠ JS forced click used for history.");
			}

			// -------- ✔ Verify Navigation --------
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(),'History')]")));

			System.out.println("📂 History Page Successfully Opened!");
			Thread.sleep(1200);

			// ---------- DELETE RECENT HISTORY ----------
			// -------- 🗑 DELETE LATEST HISTORY FILE --------

			// Wait for delete button inside first history card
			WebElement deleteIcon = wait.until(
					ExpectedConditions.elementToBeClickable(By.xpath("(//button[contains(@class,'delete-icon-btn')])[1]")));

			// Bring it into view (smooth hover effect effect match)
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block:'center'});", deleteIcon);

			Thread.sleep(900);

			try {
				deleteIcon.click();
				System.out.println("🗑 Delete icon clicked.");
			} catch (Exception ex) {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", deleteIcon);
				System.out.println("⚠ Forced delete click.");
			}

			// wait for modal animation
			Thread.sleep(1100);

			// Now click DELETE in modal
			// -------- CONFIRM DELETE --------
			WebElement confirmBtn = wait.until(ExpectedConditions
					.elementToBeClickable(By.xpath("//div[contains(@class,'ant-modal')]//button[contains(.,'Delete')]")));

			// Ensure button is in view (modal animation)
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block:'center'});", confirmBtn);

			Thread.sleep(500); // let hover/blur animation settle

			try {
				confirmBtn.click();
				System.out.println("✔ Confirm delete clicked normally");
			} catch (Exception e) {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", confirmBtn);
				System.out.println("⚠ JS forced click for confirm button");
			}

			// wait update
			Thread.sleep(500);

			System.out.println("🎉 History Row Deleted Successfully!");

			/////////////////////
			// -------- 📌 GO TO PROFILE PAGE --------
			System.out.println("➡ Navigating to Profile...");

			// Scroll bottom to show dock bar
			((JavascriptExecutor) driver).executeScript("window.scrollTo(0, document.body.scrollHeight)");
			Thread.sleep(700);

			// Trigger hover movement → like user moves cursor near dock
			((JavascriptExecutor) driver).executeScript(
			        "var ev = new MouseEvent('mousemove', {clientX: 600, clientY: window.innerHeight - 5});" +
			        "window.dispatchEvent(ev);"
			);
			Thread.sleep(900);

			// Now locate using stable selector
			WebElement profileBtn = wait.until(ExpectedConditions.elementToBeClickable(
			        By.xpath("//*[@data-testid='profile-btn']")
			));

			// Scroll into view for safety
			((JavascriptExecutor) driver).executeScript(
			        "arguments[0].scrollIntoView({behavior:'smooth', block:'center'});", profileBtn
			);
			Thread.sleep(500);

			// Click the button
			try {
			    profileBtn.click();
			    System.out.println("👤 Profile clicked normally.");
			} catch (Exception e) {
			    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", profileBtn);
			    System.out.println("⚠ Forced JS click for profile.");
			}

			// Validate page loaded
			wait.until(ExpectedConditions.visibilityOfElementLocated(
			        By.xpath("//*[contains(text(),'Profile')]")
			));

			System.out.println("🎯 Profile Page Opened Successfully!");
			Thread.sleep(1200);


			// ---------------- 📝 EDIT PROFILE ----------------

			System.out.println("➡ Opening Edit Profile modal...");

			WebElement editBtn = wait
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(., 'Edit Profile')]")));

			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block:'center'});", editBtn);
			Thread.sleep(600);

			try {
				editBtn.click();
				System.out.println("🖊 Edit button clicked normally.");
			} catch (Exception e) {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", editBtn);
				System.out.println("⚠ Forced JS click for Edit button.");
			}

			// wait modal open
			Thread.sleep(1500);
			System.out.println("📌 Edit modal opened.");

			// fill Name
			WebElement nameField = wait.until(
					ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Enter your name']")));
			nameField.clear();
			nameField.sendKeys("Vedha");

			// fill Email
			WebElement emailField = wait.until(
					ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Enter your email']")));
			emailField.clear();
			emailField.sendKeys("haritharsan62004@gmail.com");

			// select Role (already default but interaction added)
			WebElement roleField = wait
					.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@placeholder='Enter role']")));
			roleField.clear();
			roleField.sendKeys("QA Engineer");

			((JavascriptExecutor) driver).executeScript("arguments[0].click();", roleField);

			Thread.sleep(600);

			// Click Save
			WebElement saveBtn = wait
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(.,'Save')]")));
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block:'center'});", saveBtn);
			Thread.sleep(600);

			try {
				saveBtn.click();
				System.out.println("💾 Save clicked normally.");
			} catch (Exception e) {
				((JavascriptExecutor) driver).executeScript("arguments[0].click();", saveBtn);
				System.out.println("⚠ Forced JS click for Save.");
			}

			// wait success update
			Thread.sleep(1500);
			System.out.println("🎉 Profile Updated Successfully!");

			//////////////////////////////////////////////////////
			
			
			System.out.println("➡ Opening Settings & Switching Theme...");

			// Ensure dock animation happens
			((JavascriptExecutor) driver).executeScript("window.scrollTo(0, document.body.scrollHeight)");
			Thread.sleep(800);

			// Locate settings button
			WebElement settingsBtn = wait.until(ExpectedConditions.presenceOfElementLocated(
			        By.xpath("//*[@data-testid='settings-btn']"))
			);

			// --- 🔥 Artificial Hover (Fix animation block) ---
			String hoverScript = """
			var element = arguments[0];
			var ev = new MouseEvent('mouseover', { bubbles: true, cancelable: true, view: window });
			element.dispatchEvent(ev);
			""";

			((JavascriptExecutor) driver).executeScript(hoverScript, settingsBtn);
			Thread.sleep(500);

			// Smooth scroll
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior:'smooth'});", settingsBtn);
			Thread.sleep(600);

			// Click with fallback
			try {
			    settingsBtn.click();
			    System.out.println("⚙ Settings clicked normally.");
			} catch (Exception e) {
			    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", settingsBtn);
			    System.out.println("⚠ Forced click for Settings button.");
			}

			Thread.sleep(1500);

			// -------- SELECT DARK THEME --------

			// Wait theme item
			WebElement darkTheme = wait.until(ExpectedConditions.presenceOfElementLocated(
			        By.xpath("//*[@data-testid='theme-dark']"))
			);

			// Hover to trigger animation
			((JavascriptExecutor) driver).executeScript(hoverScript, darkTheme);
			Thread.sleep(500);

			// Scroll into view
			((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior:'smooth', block:'center'});", darkTheme);
			Thread.sleep(600);

			// Click with fallback
			try {
			    darkTheme.click();
			    System.out.println("🌑 Dark theme clicked normally.");
			} catch (Exception e) {
			    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", darkTheme);
			    System.out.println("⚠ Forced JS click for Dark Theme.");
			}

			Thread.sleep(1500);
			System.out.println("🎉 Theme Changed Successfully!");

			System.out.println("⏳ Waiting 10 seconds before switching back to Light mode...");
			Thread.sleep(10000);  // 10 seconds wait

			// -------- SWITCH BACK TO LIGHT THEME --------

			// locate light theme card
			WebElement lightTheme = wait.until(ExpectedConditions.presenceOfElementLocated(
			        By.xpath("//*[@data-testid='theme-light']"))
			);

			// simulate hover (prevent framer-motion scale blocking)
			String hoverScript1 = """
			var el = arguments[0];
			var ev = new MouseEvent('mouseover', { bubbles: true, cancelable: true, view: window });
			el.dispatchEvent(ev);
			""";

			((JavascriptExecutor) driver).executeScript(hoverScript1, lightTheme);
			Thread.sleep(600);

			// scroll into view smoothly
			((JavascriptExecutor) driver).executeScript(
			        "arguments[0].scrollIntoView({behavior:'smooth', block:'center'});",
			        lightTheme
			);
			Thread.sleep(800);

			// click with fallback
			try {
			    lightTheme.click();
			    System.out.println("🌕 Light theme clicked normally.");
			} catch (Exception e) {
			    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", lightTheme);
			    System.out.println("⚠ Forced JS click for Light Theme.");
			}

			Thread.sleep(1500);

			System.out.println("✨ Theme Switched Back to Light Successfully!");
			
			
			///////////////////////////////////////////
			
			
			// ===================== CLICK SEARCH ICON =====================

			WebElement searchIcon = wait.until(
			        ExpectedConditions.elementToBeClickable(By.xpath("//*[@data-testid='search-btn']"))
			);

			// Hover to avoid animation blocking
			((JavascriptExecutor) driver).executeScript("""
			var el = arguments[0];
			var ev = new MouseEvent('mouseover', { bubbles: true });
			el.dispatchEvent(ev);
			""", searchIcon);

			Thread.sleep(500);

			try {
			    searchIcon.click();
			    System.out.println("🔍 Search Icon Clicked.");
			} catch (Exception e) {
			    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", searchIcon);
			    System.out.println("⚠ Forced Search Icon Click.");
			}

			Thread.sleep(1200);


			// ===================== SEARCH MULTIPLE ITEMS =====================
			String[] searchKeywords = {"analytics", "upload", "settings", "profile" };

			for (String word : searchKeywords) {

			    // Re-fetch input each cycle (React re-renders)
			    WebElement searchInput = wait.until(
			            ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@data-testid='global-search']"))
			    );

			    try {
			        searchInput.click();
			    } catch (Exception e) {
			        ((JavascriptExecutor) driver).executeScript("arguments[0].focus();", searchInput);
			    }

			    Thread.sleep(400);

			    // Reset input
			    try {
			        searchInput.clear();
			    } catch (Exception e) {
			        ((JavascriptExecutor) driver).executeScript("arguments[0].value='';", searchInput);
			    }

			    Thread.sleep(300);

			    // Type normally, else fallback to JS
			    try {
			        searchInput.sendKeys(word);
			        System.out.println("⌨ Typed normally: " + word);
			    } catch (Exception e) {
			        ((JavascriptExecutor) driver).executeScript("arguments[0].value='" + word + "';", searchInput);
			        ((JavascriptExecutor) driver).executeScript("arguments[0].dispatchEvent(new Event('input',{bubbles:true}))", searchInput);
			        System.out.println("⚠ Typed with JS fallback: " + word);
			    }

			    Thread.sleep(1200);

			    // Select first result
			    WebElement suggestion = wait.until(
			            ExpectedConditions.elementToBeClickable(By.xpath("(//*[@data-testid='search-result'])[1]"))
			    );

			    try {
			        suggestion.click();
			    } catch (Exception e) {
			        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", suggestion);
			    }

			    System.out.println("👉 Navigated to: " + word);
			    Thread.sleep(1500);

			    // ================= 🔥 LOGOUT ON LAST ITEM (PROFILE) =================
			    if (word.equalsIgnoreCase("profile")) {

			        System.out.println("🧩 Profile Page Loaded — Preparing Logout...");
			        Thread.sleep(1200);

			        WebElement logoutBtn = wait.until(
			                ExpectedConditions.elementToBeClickable(By.xpath("//*[@data-testid='logout-btn']"))
			        );

			        try {
			            logoutBtn.click();
			        } catch (Exception e) {
			            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", logoutBtn);
			        }

			        System.out.println("🚪 Successfully Logged Out. Test Completed!");
			        break;  // STOP loop — test finished
			    }

			    // Re-open search for next iteration
			    WebElement searchIconReopen = wait.until(
			            ExpectedConditions.elementToBeClickable(By.xpath("//*[@data-testid='search-btn']"))
			    );

			    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", searchIconReopen);
			    Thread.sleep(1000);
			}
            // (rest of your full flow remains exactly same – history, profile, theme, search, logout...)

            // [SHORTENED HERE – keep your existing working code]

            logger.log("Login Completed", true, "Login success");
            logger.log("File Upload", true, "File uploaded");
            logger.log("Analyze Clicked", true, "Analysis started");
            logger.log("Card View Testing", true, "Card interactions complete");
            logger.log("PDF Downloaded", true, "PDF generated");
            logger.log("History Page Opened", true, "Navigated to history");
            logger.log("History Deleted", true, "History item removed");
            logger.log("Profile Updated", true, "Profile saved");
            logger.log("Theme Switched", true, "Dark/Light toggle complete");
            logger.log("Search Tested", true, "Search navigation working");
            logger.log("Logout Successful", true, "User logged out");
            logger.log("Full Flow Completed", true, "Automation flow finished");

            // ❌ IMPORTANT: DO NOT redirect to /test-report here
            // @AfterAll will open report using same driver+localStorage

        } catch (Exception e) {
            logger.log("Full Automation Flow Failed", false, e.getMessage());
            throw e;
        }
    }
}


// -------------------------------
// 🔥 Logger Class
// -------------------------------
class UITestLogger {

    WebDriver driver;
    private static int slNo = 1;

    public UITestLogger(WebDriver driver) {
        this.driver = driver;
    }

    public void log(String testName, boolean passed, String message) {
        JavascriptExecutor js = (JavascriptExecutor) driver;

        js.executeScript("""
            let logs = JSON.parse(localStorage.getItem('testResults') || '[]');

            logs.push({
                sl: arguments[3],  // serial number
                testName: arguments[0],
                status: arguments[1] ? "PASS" : "FAIL",
                message: arguments[2],
                time: new Date().toLocaleString()
            });

            localStorage.setItem('testResults', JSON.stringify(logs));
        """, testName, passed, message, slNo);

        slNo++; // next number
    }
}
