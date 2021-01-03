## 重学 HTML

#### HTML 的定义

- 主要源流：XML 和 SGML
- HTML5 后：接受了 XML 和 SGML 灵感的一门独立语言
- DTD 与 XML nameaspace

  - “不得在使用浏览器的时候，访问 dtd”
  - DTD
    - https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
    - https://www.w3.org/TR/xhtml1/dtds.html
  - namaspace:
    - https://www.w3.org/1999/xhtml
    - HTML
    - SVG
    - MathMl: 用于描述数学公式、符号的一种 XML 标记语言。
  - **划重点**

    - lat1.ent
      - ```html
        <!ENTITY nbsp   "&#160;">
        <!-- no-break space = non-breaking space, U+00A0 ISOnum -->
        ```
    - symbol.ent

      - ```html
        <!ENTITY Omega    "&#937;">
        <!-- greek capital letter omega, U+03A9 ISOgrk3 -->
        <!ENTITY alpha    "&#945;">
        <!-- greek small letter alpha, U+03B1 ISOgrk3 -->
        <!ENTITY beta     "&#946;">
        <!-- greek small letter beta, U+03B2 ISOgrk3 -->
        <!ENTITY lambda   "&#955;">
        <!-- greek small letter lamda, U+03BB ISOgrk3 -->
        ```

    - special.ent

      - ```html
        <!ENTITY quot    "&#34;">
        <!--  quotation mark, U+0022 ISOnum -->
        <!ENTITY amp     "&#38;#38;">
        <!--  ampersand, U+0026 ISOnum -->
        <!ENTITY lt      "&#38;#60;">
        <!--  less-than sign, U+003C ISOnum -->
        <!ENTITY gt      "&#62;">
        <!--  greater-than sign, U+003E ISOnum -->
        ```

    - 通用属性

      ```html
      <!--=================== Generic Attributes ===============================-->

      <!-- core attributes common to most elements
        id       document-wide unique id
        class    space separated list of classes
        style    associated style info
        title    advisory title/amplification
      -->
      <!ENTITY % coreattrs
      "id          ID             #IMPLIED
        class       CDATA          #IMPLIED
        style       %StyleSheet;   #IMPLIED
        title       %Text;         #IMPLIED"
        >

      <!-- internationalization attributes
        lang        language code (backwards compatible)
        xml:lang    language code (as per XML 1.0 spec)
        dir         direction for weak/neutral text
      -->
      <!ENTITY % i18n
      "lang        %LanguageCode; #IMPLIED
        xml:lang    %LanguageCode; #IMPLIED
        dir         (ltr|rtl)      #IMPLIED"
        >

      <!-- attributes for common UI events
        onclick     a pointer button was clicked
        ondblclick  a pointer button was double clicked
        onmousedown a pointer button was pressed down
        onmouseup   a pointer button was released
        onmousemove a pointer was moved onto the element
        onmouseout  a pointer was moved away from the element
        onkeypress  a key was pressed and released
        onkeydown   a key was pressed down
        onkeyup     a key was released
      -->
      <!ENTITY % events
      "onclick     %Script;       #IMPLIED
        ondblclick  %Script;       #IMPLIED
        onmousedown %Script;       #IMPLIED
        onmouseup   %Script;       #IMPLIED
        onmouseover %Script;       #IMPLIED
        onmousemove %Script;       #IMPLIED
        onmouseout  %Script;       #IMPLIED
        onkeypress  %Script;       #IMPLIED
        onkeydown   %Script;       #IMPLIED
        onkeyup     %Script;       #IMPLIED"
        >

      <!-- attributes for elements that can get the focus
        accesskey   accessibility key character
        tabindex    position in tabbing order
        onfocus     the element got the focus
        onblur      the element lost the focus
      -->
      <!ENTITY % focus
      "accesskey   %Character;    #IMPLIED
        tabindex    %Number;       #IMPLIED
        onfocus     %Script;       #IMPLIED
        onblur      %Script;       #IMPLIED"
        >

      <!ENTITY % attrs "%coreattrs; %i18n; %events;">
      ```

#### HTML 标签语义，见 wiki.html

```html
<body>
  <!-- 表示一个和其余页面内容几乎无关的部分,通常表现为侧边栏或者标注框 -->
  <aside></aside>
  <!-- 应用的主体部分 -->
  <main>
    <!-- 表示文档、页面、应用或网站中的独立结构，-->
    <!-- 可能是论坛帖子、杂志或新闻文章、博客、用户提交的评论、交互式组件，或者其他独立的内容项目。​​ -->
    <article>
      <!-- (HTML Headings Group Element) 代表一个段的标题，它将多个<h1>至<h6>的子元素组装到一起。 -->
      <hgroup>
        <h1></h1>
        <h2></h2>
      </hgroup>
      <p class="note">
        <!-- 展示缩写，可以通过可选的 title 属性提供完整的描述。 -->
        <abbr></abbr>
        <!-- 文本十分重要 -->
        <strong></strong>
        <!-- 阅读时重音，强调。 -->
        <em></em>
        <!-- 表示术语的一个定义。 -->
        <dfn></dfn>
      </p>
      <!-- 作为一个独立的引用单元。常用于插图、表格、代码段。 -->
      <figure>
        <img />
        <!-- 与其相关联的图片的说明/标题 -->
        <figcaption></figcaption>
      </figure>
      <!-- 提供导航链接 -->
      <nav>
        <!-- 有序列表 -->
        <ol>
          <li>
            <!-- 无序列表 -->
            <ul>
              <li></li>
            </ul>
          </li>
        </ol>
      </nav>
      <!-- 标识计算机程序输出 -->
      <samp>
        <!-- 预定义格式文本。按照原文件中的编排，文本中的空白符（比如空格和换行符）都会显示。 -->
        <pre></pre>
      </samp>
      <!-- 呈现一段计算机代码 -->
      <code>
        <pre>
          <!-- &lt; [<]  &gt; [>] -->
          &lt;html&gt;
            &lt;head&gt;
              &lt;title&gt;Example.org – The World Wide Web&lt;/title&gt;
            &lt;/head&gt;
            &lt;body&gt;
              &lt;p&gt;The World Wide Web, abbreviated as WWW and commonly known ...&lt;/p&gt;
            &lt;/body&gt;
          &lt;/html&gt;
        </pre>
      </code>
    </article>
  </main>
  <!-- 页脚 -->
  <footer></footer>
</body>
```

#### HTML 语法

- **合法元素**
  - Element: `<tagName> </tagName>`
  - Text: `text`
  - Commont: `<!-- commonts -->`
  - DocumentType: `<!DOCTYPE html>`
  - ProcessingInstruction: `<?a 1?>`
    - 将数据 1 传给处理器 a
    - 预处理语法
  - CDATA: `<![CDATA[]]>`
    - 文本的另一种语法的表达
- **字符引用**
  - &#161; - `&#161;`
  - &amp; - `&amp;`
  - &lt; - `&lt;`
  - &quot; - `&quot;`
  - &apos; - `&apos;`
  - &#39; - `&#39;`
